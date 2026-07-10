"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/campus-life", label: "Cloud", icon: "/icons/cloud.svg" },
  { href: "/mes-services", label: "Mes services", icon: "/icons/book.svg" },
  { href: "/", label: "Accueil", icon: "/icons/home.svg" },
  { href: "/messagerie", label: "Messagerie", icon: "/icons/calendar.svg" },
  { href: "/mon-espace", label: "Mon espace", icon: "/icons/community.svg" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around bg-base h-20 px-2 z-50">
      {links.map(({ href, label, icon }) => {
        const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

        return (
          <Link key={href} href={href} className="flex flex-col items-center justify-center">
            <span
              className={`flex flex-col items-center justify-center gap-0.5 rounded-2xl ${
                isActive ? "bg-entreprenariat-500 px-3 py-0.5" : ""
              }`}
            >
              <Image src={icon} alt={label} width={40} height={40} />
              {isActive && <span className="text-white text-sm font-medium">{label}</span>}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
