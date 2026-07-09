import type { Conversation } from "./types";

export const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Julie Martin",
    preview: "Merci pour ton rendu, c'est très bien !",
    time: "9:35",
    type: "person",
    unreadCount: 1,
    urgent: true,
  },
  {
    id: "2",
    name: "Support technique",
    preview: "Nouveau message non lu",
    time: "Il y a 1 h",
    type: "support",
    unreadCount: 1,
    urgent: true,
  },
  {
    id: "3",
    name: "Thomas Petit",
    preview: "On se retrouve demain pour finaliser...",
    time: "Hier",
    type: "person",
    unreadCount: 2,
  },
  {
    id: "4",
    name: "Scolarité",
    preview: "Rappel : ton inscription administrative...",
    time: "Hier",
    type: "system",
  },
  {
    id: "5",
    name: "Groupe projet UX",
    preview: "Léa : J'ai partagé le fichier Figma",
    time: "Mar.",
    type: "group",
    unreadCount: 3,
  },
  {
    id: "6",
    name: "Support technique",
    preview: "Votre ticket #4587 a été mis à jour.",
    time: "Lun.",
    type: "support",
  },
];