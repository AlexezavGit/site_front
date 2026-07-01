export const GAD7_QUESTIONS = [
  "Відчуття нервозності, тривоги або \"натягнутості\"",
  "Неможливість зупинити або контролювати хвилювання",
  "Надмірне хвилювання з приводу різних речей",
  "Труднощі з розслабленням",
  "Така сильна неспокій, що важко всидіти на місці",
  "Легка роздратованість або дратівливість",
  "Страх, що може трапитись щось жахливе",
];

export const GAD7_OPTIONS = [
  { label: "Жодного разу", value: 0 },
  { label: "Кілька днів", value: 1 },
  { label: "Більше половини днів", value: 2 },
  { label: "Майже щодня", value: 3 },
];

export function getGAD7Severity(score: number): { label: string; color: string; route: string } {
  if (score <= 4) return { label: "Мінімальна тривога", color: "text-green-600", route: "no_intervention" };
  if (score <= 9) return { label: "Легка тривога", color: "text-yellow-600", route: "self_help" };
  if (score <= 14) return { label: "Помірна тривога", color: "text-orange-600", route: "mid_level" };
  return { label: "Тяжка тривога", color: "text-red-700", route: "specialist" };
}
