"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { BellIcon, UserIcon } from "./home/icons";
import Notification, { NotificationItem } from "./Notification";

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

export default function TopBar() {
  const pathname = usePathname();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const hasUnreadNotifications = notifications.some((item) => !item.read);

  const openNotifications = () => {
    setIsNotifOpen(true);
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  // Le dashboard et la page profil ont leur propre en-tête plein cadre :
  // on masque la TopBar pour éviter un bandeau redondant au-dessus.
  if (pathname === "/" || pathname.startsWith("/profil")) {
    return null;
  }

  return (
    <header className="flex items-center justify-between px-5 pt-[calc(env(safe-area-inset-top,0px)+1rem)]">
      <Image
        src="/brand/icon-color.svg"
        alt="Lamarr"
        width={40}
        height={40}
        className="h-10 w-10"
      />
      <div className="flex items-center gap-3">
        <Link
          href="/profil"
          aria-label="Mon profil"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-paper text-ink transition hover:bg-paper-soft"
        >
          <UserIcon className="h-5 w-5" />
        </Link>
        <button
          type="button"
          aria-label="Notifications"
          onClick={openNotifications}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-border bg-paper text-ink transition hover:bg-paper-soft"
        >
          <BellIcon className="h-5 w-5" />
          {hasUnreadNotifications && (
            <span
              aria-hidden
              className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-entreprenariat-500 ring-2 ring-paper"
            />
          )}
        </button>
      </div>

      <Notification
        items={notifications}
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
      />
    </header>
  );
}
