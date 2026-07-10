"use client";

import { useState } from "react";

import Notification, { NotificationItem } from "@/components/Notification";
import { BellIcon } from "./icons";

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Nouveau livrable disponible",
    message: "L'Audit UX est à rendre le 7 Juillet pour 23h59.",
    date: "Il y a 2h",
    category: "entreprenariat",
    read: false,
  },
  {
    id: "notif-2",
    title: "Cours en distanciel",
    message: "Marketing digital passe en distanciel aujourd'hui.",
    date: "Il y a 5h",
    category: "tech",
    read: false,
  },
  {
    id: "notif-3",
    title: "Nouvelle note",
    message: "Ta note de Gamification est disponible : 14/20.",
    date: "Hier",
    category: "creativite",
    read: true,
  },
];

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const hasUnread = notifications.some((item) => !item.read);

  const open = () => {
    setIsOpen(true);
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  return (
    <>
      <button
        type="button"
        aria-label="Notifications"
        onClick={open}
        className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-paper transition hover:bg-white/20"
      >
        <BellIcon className="h-5 w-5" />
        {hasUnread && (
          <span
            aria-hidden
            className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-entreprenariat-500 ring-2 ring-base"
          />
        )}
      </button>

      <Notification
        items={notifications}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
