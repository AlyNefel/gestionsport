export const SPORTS = [
  "athletisme", "handball", "volleyball", "basketball",
  "football", "gymnastique", "natation", "judo", "tennis"
];

export const NIVEAUX = [
  "1ère année", "2ème année", "3ème année", "4ème année"
];

export const TRIMESTRES = [1, 2, 3];

export const INCIDENT_TYPES = [
  "Comportement", "Blessure", "Absence répétée", "Matériel endommagé", "Autre"
];

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
