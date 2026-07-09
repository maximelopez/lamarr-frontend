import { SchoolLifeEvent } from "./types/school-life-event";


/**
 * Jeu de données de démonstration.
 * À remplacer plus tard par un fetch vers votre API / CMS
 * (même shape de retour attendue : SchoolLifeEvent[])
 */
export const mockSchoolLifeEvents: SchoolLifeEvent[] = [
  {
    id: "evt-1",
    type: "event",
    title: "My digital Summer",
    subtitle: "Soirée d'été du campus",
    date: "2026-07-07",
    startTime: "18:00",
    location: "Sur le campus",
    description:
      "Rendez-vous mardi 7 juillet à partir de 18h sur le campus pour une soirée estivale.",
  },
  {
    id: "evt-2",
    type: "food_truck",
    title: "Food Truck",
    subtitle: "Pizza Papone",
    date: "2026-07-07",
    startTime: "11:30",
    endTime: "14:00",
    location: "Parvis principal",
    action: { label: "Commander", href: "/food-truck/pizza-papone" },
  },
  {
    id: "evt-3",
    type: "announcement",
    title: "Questionnaire de fin de module",
    subtitle: "Gamification",
    date: "2026-07-07",
    description: "Merci de compléter le questionnaire avant la fin de semaine.",
    action: { label: "Répondre", href: "/questionnaires/gamification" },
  },
  {
    id: "evt-4",
    type: "food_truck",
    title: "Food Truck",
    subtitle: "Le Camion qui Fume",
    date: "2026-07-08",
    startTime: "11:30",
    endTime: "14:00",
    location: "Parvis principal",
    action: { label: "Commander", href: "/food-truck/camion-qui-fume" },
  },
  {
    id: "evt-5",
    type: "event",
    title: "Forum Entreprises",
    subtitle: "Rencontre avec 20+ entreprises partenaires",
    date: "2026-07-10",
    startTime: "09:00",
    endTime: "17:00",
    location: "Hall B",
    action: { label: "S'inscrire", href: "/evenements/forum-entreprises" },
  },
  {
    id: "evt-6",
    type: "deadline",
    title: "Date limite inscription voyage d'études",
    date: "2026-07-15",
    description: "Dernier jour pour s'inscrire au voyage d'études de septembre.",
  },
];
