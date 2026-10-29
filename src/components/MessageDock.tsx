"use client";

import { useEffect, useRef, useState } from "react";

type Channel = { id: string; label: string; detail: string; href: string };

const ICONS: Record<string, React.ReactNode> = {
  whatsapp: <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1a3.5 3.5 0 0 1-2-2l1-1-1-2z" />,
  sms: <path d="M4 5h16v11H9l-5 4z M8 10h8M8 13h5" />,
  messenger: <path d="M12 3c-5 0-9 3.7-9 8.3 0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z M7 13.5l3.5-3.5 2.5 2 3.5-2.5-3.5 3.5-2.5-2z" />,
  call: <path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v3a3 3 0 0 1-3 3A15 15 0 0 1 3 6a3 3 0 0 1 3-3z" />,
  email: <path d="M3 6h18v12H3z M3 7l9 6 9-6" />,
};

export default function MessageDock({ channels }: { channels: Channel[] }) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (panel.current && !panel.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={panel} className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div
          id="message-panel"
          className="w-[min(20rem,calc(100vw-2rem))] origin-bottom-right overflow-hidden border-2 border-graphite bg-white shadow-[6px_6px_0_var(--color-graphite)]"
        >
          <div className="bg-asphalt px-5 py-4 text-white">
            <p className="condensed text-[1.4rem] font-extrabold uppercase leading-none">Reach Alex directly</p>
            <p className="mt-1.5 text-sm text-[#c3c9cd]">These go straight to my phone.</p>
          </div>
          <ul className="divide-y divide-rule">
            {channels.map((c) => (
              <li key={c.id}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 px-5 py-3.5 hover:bg-[#fbffe0]"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden>
                    {ICONS[c.id]}
                  </svg>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{c.label}</span>
                    <span className="block truncate text-sm text-steel">{c.detail}</span>
                  </span>
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-steel" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden><path d="M7 17 17 7M8 7h9v9" /></svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="button"
        aria-expanded={open}
        aria-controls="message-panel"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-3 border-2 border-graphite bg-hivis py-2 pl-4 pr-2 font-bold text-graphite shadow-[4px_4px_0_var(--color-graphite)]"
      >
        {open ? "Close" : "Text Alex"}
        <span className="grid h-9 w-9 place-items-center bg-graphite text-hivis" aria-hidden>
          {open ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
              <path d="M4 5h16v11H9l-5 4z" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}
