"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import "../styles/Sidebar.css";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/hub-news", label: "Hub News" },
  { href: "/campus-life", label: "Campus Life" },
  { href: "/mes-services", label: "My Services" },
  { href: "/mon-espace", label: "Mon espace" },
  { href: "/messagerie", label: "Messagerie" },
  { href: "/profil", label: "Menu Profil" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        Lamarr
      </div>

      <nav>
        <ul className="sidebar__nav">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    isActive
                      ? "sidebar__link sidebar__link--active"
                      : "sidebar__link"
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}