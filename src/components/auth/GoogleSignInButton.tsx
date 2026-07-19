"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: Record<string, unknown>) => void;
          renderButton: (el: HTMLElement, config: Record<string, unknown>) => void;
          cancel: () => void;
        };
      };
    };
  }
}

type Props = {
  onCredential: (credential: string) => Promise<void> | void;
  disabled?: boolean;
  label?: string;
};

export function GoogleSignInButton({ onCredential, disabled }: Props) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const buttonRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const handlerRef = useRef(onCredential);
  handlerRef.current = onCredential;

  const mountButton = useCallback(() => {
    if (!clientId || !buttonRef.current || !window.google?.accounts?.id) return;
    buttonRef.current.innerHTML = "";
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response: { credential?: string }) => {
        if (!response.credential || disabled) return;
        setBusy(true);
        try {
          await handlerRef.current(response.credential);
        } finally {
          setBusy(false);
        }
      },
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: "outline",
      size: "large",
      shape: "pill",
      width: 320,
      text: "continue_with",
      logo_alignment: "left",
    });
    setReady(true);
  }, [clientId, disabled]);

  useEffect(() => {
    if (window.google?.accounts?.id) mountButton();
  }, [mountButton]);

  if (!clientId) return null;

  return (
    <div className="w-full">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={mountButton}
      />
      <div
        ref={buttonRef}
        className={`flex min-h-11 w-full justify-center ${busy || disabled ? "pointer-events-none opacity-60" : ""}`}
      />
      {!ready && (
        <p className="text-center text-xs text-muted">Loading Google…</p>
      )}
    </div>
  );
}
