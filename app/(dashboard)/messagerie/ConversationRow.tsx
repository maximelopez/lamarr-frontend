import { BuildingIcon, HeadsetIcon, UsersIcon, ChevronRightIcon } from "./icons";
import type { Conversation } from "./types";

function Avatar({ conversation }: { conversation: Conversation }) {
  const base = "flex h-11 w-11 shrink-0 items-center justify-center rounded-full";

  if (conversation.type === "support") {
    return (
      <div className={`${base} bg-paper-soft text-ink-muted`}>
        <HeadsetIcon className="h-5 w-5" />
      </div>
    );
  }
  if (conversation.type === "system") {
    return (
      <div className={`${base} bg-paper-soft text-ink-muted`}>
        <BuildingIcon className="h-5 w-5" />
      </div>
    );
  }
  if (conversation.type === "group") {
    return (
      <div className={`${base} bg-paper-soft text-ink-muted`}>
        <UsersIcon className="h-5 w-5" />
      </div>
    );
  }

  const initials = conversation.name
    .split(" ")
    .map((part: any) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className={`${base} bg-paper-soft font-heading text-sm font-semibold text-ink`}>
      {initials}
    </div>
  );
}

export function UrgentRow({ conversation }: { conversation: Conversation }) {
  return (
    <button className="flex w-full items-center gap-3 py-3 text-left">
      <div className="relative">
        <Avatar conversation={conversation} />
        <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-paper bg-entreprenariat" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-body text-sm font-semibold text-ink">{conversation.name}</p>
        <p className="truncate font-body text-xs text-ink-muted">{conversation.preview}</p>
      </div>
      <div className="flex shrink-0 items-center gap-1 text-ink-muted">
        <span className="font-body text-xs">{conversation.time}</span>
        <ChevronRightIcon className="h-4 w-4" />
      </div>
    </button>
  );
}

export function ConversationListRow({ conversation }: { conversation: Conversation }) {
  return (
    <button className="flex w-full items-center gap-3 py-3.5 text-left">
      <Avatar conversation={conversation} />
      <div className="min-w-0 flex-1">
        <p className="truncate font-body text-sm font-semibold text-ink">{conversation.name}</p>
        <p className="truncate font-body text-xs text-ink-muted">{conversation.preview}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <span className="font-body text-xs text-ink-muted">{conversation.time}</span>
        {conversation.unreadCount ? (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-entreprenariat text-[11px] font-semibold text-white">
            {conversation.unreadCount}
          </span>
        ) : null}
      </div>
    </button>
  );
}