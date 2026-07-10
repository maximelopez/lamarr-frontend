"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BellIcon, UserIcon } from "./home/icons";

export default function TopBar() {
  const pathname = usePathname();

  // Le dashboard et la page profil ont leur propre en-tête plein cadre :
  // on masque la TopBar pour éviter un bandeau blanc redondant au-dessus.
  if (pathname === "/" || pathname.startsWith("/profil")) {
    return null;
  }

  const isProfil = pathname.startsWith("/profil");

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
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition ${
            isProfil
              ? "border-ink bg-ink text-paper"
              : "border-border bg-paper text-ink hover:bg-paper-soft"
          }`}
        >
          <UserIcon className="h-5 w-5" />
        </Link>
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-paper text-ink transition hover:bg-paper-soft"
        >
          <BellIcon className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
