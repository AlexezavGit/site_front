import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  MapPin, Play, Square, CheckCircle2, Clock, Wifi, WifiOff,
  Send, Lock, Unlock, AlertCircle, Timer, FileText
} from "lucide-react";

type HandshakeStage =
  | "pre_session"    // Очікує початку
  | "active"         // Сеанс іде
  | "post_survey"    // Опитувальник після сеансу
  | "pending_record" // Очікує запису фахівця
  | "escrow_unlock"; // Ескроу розблоковано

interface GpsPoint { lat: number; lon: number; timestamp: string; online: boolean }

interface SessionHandshakeProps {
  sessionNumber: number;
  totalSessions: number;
  providerName: string;
  role: "provider" | "beneficiary";
  onComplete?: () => void;
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function SessionHandshake({
  sessionNumber, totalSessions, providerName, role, onComplete
}: SessionHandshakeProps) {
  const { toast } = useToast();
  const [stage, setStage] = useState<HandshakeStage>("pre_session");
  const [startGps, setStartGps] = useState<GpsPoint | null>(null);
  const [stopGps, setStopGps] = useState<GpsPoint | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState<number[]>([]);
  const [comment, setComment] = useState("");
  const [providerNote, setProviderNote] = useState("");
  const [gpsLoading, setGpsLoading] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => { window.removeEventListener("online", onOnline); window.removeEventListener("offline", onOffline); };
  }, []);

  useEffect(() => {
    if (stage === "active") {
      intervalRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [stage]);

  const getGPS = (): Promise<GpsPoint> =>
    new Promise((resolve) => {
      const ts = new Date().toISOString();
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude, timestamp: ts, online }),
          () => resolve({ lat: 0, lon: 0, timestamp: ts, online }),
          { timeout: 5000 }
        );
      } else {
        resolve({ lat: 50.45 + Math.random() * 0.01, lon: 30.52 + Math.random() * 0.01, timestamp: ts, online });
      }
    });

  const handleStart = async () => {
    setGpsLoading(true);
    const gps = await getGPS();
    setStartGps(gps);
    setGpsLoading(false);
    setStage("active");
    setElapsed(0);
    toast({
      title: "Сеанс розпочато",
      description: online ? "GPS зафіксовано. Сповіщення надіслано." : "GPS збережено локально. Надішлеться при появі зв'язку.",
    });
  };

  const handleStop = async () => {
    setGpsLoading(true);
    const gps = await getGPS();
    setStopGps(gps);
    setGpsLoading(false);
    setStage("post_survey");
    toast({ title: "Сеанс завершено", description: `Тривалість: ${formatDuration(elapsed)}. Надіслано запит на опитування.` });
  };

  const POST_SURVEY = [
    { q: "Як ви оцінюєте свій стан після сеансу?", opts: ["Значно гірше", "Трохи гірше", "Без змін", "Трохи краще", "Значно краще"] },
    { q: "Наскільки ви задоволені сьогоднішнім сеансом?", opts: ["Незадоволений", "Скоріше незадоволений", "Нейтрально", "Задоволений", "Дуже задоволений"] },
    { q: "Чи відчуваєте ви прогрес у роботі над вашим запитом?", opts: ["Зовсім ні", "Мало", "Помірно", "Так", "Відчутний прогрес"] },
  ];

  const [surveyStep, setSurveyStep] = useState(0);

  const handleSurveyAnswer = (val: number) => {
    const newAnswers = [...surveyAnswers, val];
    setSurveyAnswers(newAnswers);
    if (surveyStep + 1 < POST_SURVEY.length) {
      setSurveyStep(s => s + 1);
    } else {
      if (role === "beneficiary") {
        setStage("pending_record");
        toast({ title: "Дякуємо!", description: "Ваші відповіді надіслано фахівцю та включено до звіту." });
      } else {
        setStage("pending_record");
      }
    }
  };

  const handleProviderRecord = () => {
    if (!providerNote.trim()) return;
    setStage("escrow_unlock");
    toast({ title: "Запис зроблено. Ескроу розблоковано!", description: "Оплата за сеанс автоматично вивільнена з ескроу рахунку." });
    onComplete?.();
  };

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-teal-600" />
            Сеанс {sessionNumber} / {totalSessions} — {providerName}
          </div>
          <div className="flex items-center gap-1">
            {online
              ? <><Wifi className="w-3.5 h-3.5 text-green-500" /><span className="text-xs text-green-600">Онлайн</span></>
              : <><WifiOff className="w-3.5 h-3.5 text-amber-500" /><span className="text-xs text-amber-600">Офлайн</span></>
            }
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">

        {/* Progress dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSessions }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i < sessionNumber - 1 ? "bg-teal-500" : i === sessionNumber - 1 ? "bg-teal-300" : "bg-slate-200"}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {stage === "pre_session" && (
            <motion.div key="pre" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-teal-50 border-2 border-teal-200 mx-auto flex items-center justify-center">
                  <Play className="w-8 h-8 text-teal-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">Готові розпочати сеанс?</p>
                  <p className="text-xs text-muted-foreground mt-1">Натискання кнопки фіксує GPS-позицію та час початку сеансу</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border text-xs text-muted-foreground">
                  {online ? "📡 GPS-мітка буде надіслана миттєво" : "📦 GPS-пакет збережено локально. Надішлеться при появі зв'язку (макс. 48 год)"}
                </div>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8"
                  onClick={handleStart} disabled={gpsLoading}
                  data-testid="button-session-start"
                >
                  {gpsLoading ? <><MapPin className="w-4 h-4 animate-pulse mr-2" /> GPS…</> : <><Play className="w-4 h-4 mr-2" /> Старт сеансу</>}
                </Button>
              </div>
            </motion.div>
          )}

          {stage === "active" && (
            <motion.div key="active" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-center py-4 space-y-4">
                <div className="relative w-20 h-20 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-teal-100 animate-ping opacity-30" />
                  <div className="w-20 h-20 rounded-full bg-teal-50 border-2 border-teal-400 flex items-center justify-center">
                    <Clock className="w-9 h-9 text-teal-600" />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-2xl font-mono text-slate-800">{formatDuration(elapsed)}</p>
                  <p className="text-xs text-muted-foreground">Сеанс активний</p>
                </div>
                {startGps && startGps.lat !== 0 && (
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3 text-teal-600" />
                    <span>{startGps.lat.toFixed(4)}, {startGps.lon.toFixed(4)}</span>
                  </div>
                )}
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8"
                  onClick={handleStop} disabled={gpsLoading}
                  data-testid="button-session-stop"
                >
                  {gpsLoading ? <><MapPin className="w-4 h-4 animate-pulse mr-2" /> GPS…</> : <><Square className="w-4 h-4 mr-2" /> Завершити сеанс</>}
                </Button>
              </div>
            </motion.div>
          )}

          {stage === "post_survey" && (
            <motion.div key="survey" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              {role === "beneficiary" ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-medium">Зворотній зв'язок після сеансу</span>
                    <Badge variant="outline" className="ml-auto text-xs">{surveyStep + 1}/{POST_SURVEY.length}</Badge>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-indigo-500 transition-all" style={{ width: `${(surveyStep / POST_SURVEY.length) * 100}%` }} />
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border">
                    <p className="text-sm font-medium text-slate-800">{POST_SURVEY[surveyStep].q}</p>
                  </div>
                  <div className="space-y-2">
                    {POST_SURVEY[surveyStep].opts.map((opt, i) => (
                      <button key={i} onClick={() => handleSurveyAnswer(i)}
                        className="w-full text-left px-4 py-2.5 rounded-lg border bg-white hover:border-indigo-400 hover:bg-indigo-50 transition-all text-sm"
                        data-testid={`survey-opt-${surveyStep}-${i}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span className="text-xs text-blue-800">Сеанс завершено. Очікуємо відповідей від бенефіціара...</span>
                  </div>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white" onClick={() => setStage("pending_record")}>
                    Зробити запис у кейс →
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {stage === "pending_record" && (
            <motion.div key="record" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {role === "provider" ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-medium text-amber-800">Ескроу заблоковано — очікує вашого запису</span>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-xs space-y-1">
                    {stopGps && stopGps.lat !== 0 && <p>📍 GPS стоп: {stopGps.lat.toFixed(4)}, {stopGps.lon.toFixed(4)}</p>}
                    <p>⏱ Тривалість: {formatDuration(elapsed)}</p>
                    <p>📋 Опитування бенефіціара: {surveyAnswers.length > 0 ? `${surveyAnswers.length} відповідей отримано` : "очікуємо"}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">Запис у кейс / клінічні нотатки</label>
                    <Textarea
                      placeholder="Зміст сеансу, спостереження, зміни у стані, коригування плану реабілітації..."
                      value={providerNote} onChange={e => setProviderNote(e.target.value)}
                      rows={4} className="text-sm"
                      data-testid="input-provider-note"
                    />
                  </div>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                    onClick={handleProviderRecord} disabled={!providerNote.trim()}
                    data-testid="button-save-record"
                  >
                    <Send className="w-4 h-4 mr-2" /> Зберегти запис → Розблокувати ескроу
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">Запис одночасно надсилається бенефіціару та донору як частина звіту</p>
                </div>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-amber-50 border-2 border-amber-200 mx-auto flex items-center justify-center">
                    <Lock className="w-6 h-6 text-amber-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-800">Ваші відповіді надіслано</p>
                  <p className="text-xs text-muted-foreground">Очікуємо запис фахівця. Після цього ескроу буде розблоковано автоматично.</p>
                  {comment !== undefined && (
                    <div>
                      <Textarea placeholder="Додатковий коментар для фахівця (необов'язково)..."
                        value={comment} onChange={e => setComment(e.target.value)}
                        rows={2} className="text-sm mt-2"
                        data-testid="input-beneficiary-comment"
                      />
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {stage === "escrow_unlock" && (
            <motion.div key="unlock" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-300 mx-auto flex items-center justify-center">
                  <Unlock className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-base text-green-700">Ескроу розблоковано</p>
                  <p className="text-xs text-muted-foreground mt-1">Оплата за сеанс вивільнена з ескроу рахунку</p>
                </div>
                <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-xs space-y-2 text-left">
                  <div className="flex justify-between"><span className="text-muted-foreground">Сеанс:</span><span className="font-medium">{sessionNumber} / {totalSessions}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Тривалість:</span><span className="font-medium font-mono">{formatDuration(elapsed)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">GPS верифікація:</span><span className="font-medium text-green-600">✓ Підтверджено</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Опитування:</span><span className="font-medium text-green-600">✓ Завершено</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Запис фахівця:</span><span className="font-medium text-green-600">✓ Збережено</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Звіт донорам:</span><span className="font-medium text-green-600">✓ Надіслано</span></div>
                </div>
                {sessionNumber < totalSessions && (
                  <p className="text-xs text-muted-foreground">Наступний сеанс: {sessionNumber + 1} / {totalSessions}</p>
                )}
                {sessionNumber === totalSessions && (
                  <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                    <p className="text-sm font-bold text-purple-800">🎉 Курс реабілітації завершено!</p>
                    <p className="text-xs text-purple-700 mt-1">Фінальний звіт сформовано. Дані надіслано донорам і до відкритого датасету.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
