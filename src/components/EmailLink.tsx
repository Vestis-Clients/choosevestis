"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

// Builds the address in the browser only, so it isn't in the HTML that bots scrape.
// On the server (and in the static HTML) it renders as plain "Email".
export function useEmail(user: string) {
  return useSyncExternalStore(
    noop,
    () => [user, ["choosevestis", "com"].join(".")].join("@"),
    () => null,
  );
}

export default function EmailLink({ user, className = "" }: { user: string; className?: string }) {
  const addr = useEmail(user);
  if (!addr) return <span className={className}>Email</span>;
  return (
    <a href={`mailto:${addr}`} className={className}>
      {addr}
    </a>
  );
}
