"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BellIcon, UserIcon } from "./home/icons";

export default function TopBar() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  const isMonEspace = pathname.startsWith("/mon-espace");

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
          href="/mon-espace"
          aria-label="Mon espace personnel"
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition ${
            isMonEspace
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
