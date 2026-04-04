"use client";

// app/error.tsx
// Next.js requires error boundaries to be Client Components.

import { useEffect } from "react";
import "./error.css";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="er-root">
      {/* Grain */}
      <div className="er-grain" />

      {/* Ambient orbs */}
      <div className="er-orb er-orb-1" />
      <div className="er-orb er-orb-2" />

      <div className="er-center">
        {/* Broken plate visual */}
        <div className="er-icon-wrap">
          <div className="er-ring er-ring-outer" />
          <div className="er-ring er-ring-mid" />
          <div className="er-plate">
            <span className="er-emoji">🍽️</span>
            {/* Crack lines */}
            <div className="er-crack er-crack-1" />
            <div className="er-crack er-crack-2" />
          </div>
        </div>

        {/* Error code */}
        <div className="er-code-wrap">
          <span className="er-code-line" />
          <span className="er-code">500</span>
          <span className="er-code-line" />
        </div>

        {/* Heading */}
        <div className="er-text">
          <h1 className="er-title">
            Something went <em>wrong</em>
          </h1>
          <p className="er-subtitle">
            The kitchen hit a snag. Our team has been notified — try again or
            head back home.
          </p>

          {/* Error message (dev-friendly) */}
          {error?.message && (
            <div className="er-detail">
              <span className="er-detail-label">Error</span>
              <span className="er-detail-msg">{error.message}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="er-actions">
          <button className="er-btn er-btn-primary" onClick={reset}>
            Try again
          </button>
          <a href="/" className="er-btn er-btn-ghost">
            Back to home
          </a>
        </div>
      </div>
    </div>
  );
}