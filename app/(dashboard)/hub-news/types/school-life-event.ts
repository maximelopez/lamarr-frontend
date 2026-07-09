/**
 * Types de contenu pouvant apparaître dans le planning "vie de l'école".
 * (par opposition au planning des cours, qui a son propre modèle)
 */
export type SchoolLifeEventType =
  | "food_truck"
  | "event" // soirée, forum, sortie...
  | "announcement" // info générale, questionnaire, campus vie...
  | "deadline"; // date limite non académique (inscription, paiement...)

export interface SchoolLifeAction {
  /** Libellé du bouton, ex: "Commander", "S'inscrire", "Voir le détail" */
  label: string;
  href: string;
}

export interface SchoolLifeEvent {
  id: string;
  type: SchoolLifeEventType;
  title: string;
  /** Sous-titre court, ex: nom du food truck, organisateur... */
  subtitle?: string;
  /** Date ISO, ex: "2026-07-07" */
  date: string;
  /** Heure de début, ex: "18:00" */
  startTime?: string;
  /** Heure de fin, ex: "22:00" */
  endTime?: string;
  location?: string;
  description?: string;
  imageUrl?: string;
  action?: SchoolLifeAction;
}
