export const PHQ9_QUESTIONS = [
  "Відсутність інтересу або задоволення від занять",
  "Пригніченість, відчай або безнадійність",
  "Труднощі зі сном або навпаки — занадто довгий сон",
  "Відчуття втоми або браку енергії",
  "Поганий апетит або переїдання",
  "Відчуття власної нікчемності або надмірної провини",
  "Труднощі з концентрацією уваги (читання, перегляд телевізора тощо)",
  "Сповільнені або, навпаки, надто активні рухи / мова (помітні оточуючим)",
  "Думки про те, що краще б не жити, або бажання завдати собі шкоди",
];

export const FREQUENCY_OPTIONS = [
  { label: "Жодного разу", value: 0 },
  { label: "Кілька днів", value: 1 },
  { label: "Більше половини днів", value: 2 },
  { label: "Майже щодня", value: 3 },
];

export function getPHQ9Severity(score: number): { label: string; color: string; route: string } {
  if (score <= 4) return { label: "Мінімальна депресія", color: "text-green-600", route: "no_intervention" };
  if (score <= 9) return { label: "Легка депресія", color: "text-yellow-600", route: "self_help" };
  if (score <= 14) return { label: "Помірна депресія", color: "text-orange-600", route: "mid_level" };
  if (score <= 19) return { label: "Помірно тяжка депресія", color: "text-red-600", route: "specialist" };
  return { label: "Тяжка депресія", color: "text-red-800", route: "psychiatry" };
}
