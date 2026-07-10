"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BellIcon, UserIcon } from "./home/icons";

export default function TopBar() {
  const pathname = usePathname();

  // Le dashboard et la page profil ont leur propre en-tête plein cadre :
  // on masque la TopBar pour éviter un bandeau redondant au-dessus.
  if (pathname === "/" || pathname.startsWith("/profil")) {
    return null;
  }

  return (
    <header className="rounded-b-3xl bg-base px-5 pb-5 pt-[calc(env(safe-area-inset-top,0px)+1rem)]">
      <div className="flex items-center justify-between">
        <Image
          src="/brand/icon-color.svg"
          alt="Lamarr"
          width={40}
          height={40}
          className="h-10 w-10"
        />
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-paper transition hover:bg-white/20"
          >
            <BellIcon className="h-5 w-5" />
          </button>
          <Link
            href="/profil"
            aria-label="Mon profil"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-paper transition hover:bg-white/20"
          >
            <UserIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
