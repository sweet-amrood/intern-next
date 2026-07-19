"use client";

import { getCourseCertificateTheme } from "@/lib/certificates";

export type CertificateDocumentProps = {
  studentName: string;
  courseTitle: string;
  courseSlug: string;
  issuedAt: string | null;
  certificateId: string;
  section?: number;
};

export function CertificateDocument({
  studentName,
  courseTitle,
  courseSlug,
  issuedAt,
  certificateId,
  section,
}: CertificateDocumentProps) {
  const theme = getCourseCertificateTheme(courseSlug);
  const issuedLabel = issuedAt
    ? new Date(issuedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
  const shortId = certificateId.replace(/[^a-zA-Z0-9]/g, "").slice(-8).toUpperCase();
  const uid = certificateId.replace(/[^a-zA-Z0-9]/g, "");

  return (
    <div
      style={{
        width: 1122,
        height: 794,
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        background: "#fbfaf6",
        color: theme.ink,
        fontFamily: "Georgia, 'Times New Roman', Times, serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(180deg, ${theme.soft} 0%, #fbfaf6 28%, #fbfaf6 72%, ${theme.soft} 100%)
          `,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 22,
          border: `2.5px solid ${theme.accentDeep}`,
          boxSizing: "border-box",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 32,
          border: `1px solid ${theme.accent}`,
          boxSizing: "border-box",
          opacity: 0.75,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 22,
          left: 22,
          right: 22,
          height: 8,
          background: `linear-gradient(90deg, ${theme.accentDeep}, ${theme.accent}, ${theme.accentDeep})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 22,
          left: 22,
          right: 22,
          height: 8,
          background: `linear-gradient(90deg, ${theme.accentDeep}, ${theme.accent}, ${theme.accentDeep})`,
        }}
      />

      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        style={{ position: "absolute", top: 42, left: 42 }}
        aria-hidden
      >
        <path d="M8 28 V10 H26" fill="none" stroke={theme.accentDeep} strokeWidth="2" />
        <path d="M8 18 H16 M18 10 V18" fill="none" stroke={theme.accent} strokeWidth="1.5" />
      </svg>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        style={{ position: "absolute", top: 42, right: 42, transform: "scaleX(-1)" }}
        aria-hidden
      >
        <path d="M8 28 V10 H26" fill="none" stroke={theme.accentDeep} strokeWidth="2" />
        <path d="M8 18 H16 M18 10 V18" fill="none" stroke={theme.accent} strokeWidth="1.5" />
      </svg>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        style={{ position: "absolute", bottom: 42, left: 42, transform: "scaleY(-1)" }}
        aria-hidden
      >
        <path d="M8 28 V10 H26" fill="none" stroke={theme.accentDeep} strokeWidth="2" />
        <path d="M8 18 H16 M18 10 V18" fill="none" stroke={theme.accent} strokeWidth="1.5" />
      </svg>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        style={{ position: "absolute", bottom: 42, right: 42, transform: "scale(-1)" }}
        aria-hidden
      >
        <path d="M8 28 V10 H26" fill="none" stroke={theme.accentDeep} strokeWidth="2" />
        <path d="M8 18 H16 M18 10 V18" fill="none" stroke={theme.accent} strokeWidth="1.5" />
      </svg>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          boxSizing: "border-box",
          padding: "56px 88px 44px",
          display: "grid",
          gridTemplateRows: "auto auto auto 1fr auto auto",
          alignItems: "center",
          justifyItems: "center",
          textAlign: "center",
          rowGap: 0,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden>
              <defs>
                <linearGradient id={`logo-${uid}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={theme.accent} />
                  <stop offset="100%" stopColor={theme.accentDeep} />
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="36" height="36" rx="10" fill={`url(#logo-${uid})`} />
              <text
                x="20"
                y="26"
                textAnchor="middle"
                fill="#fff"
                fontFamily="Arial, Helvetica, sans-serif"
                fontSize="16"
                fontWeight="800"
              >
                I
              </text>
            </svg>
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontWeight: 800,
                  fontSize: 22,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                Intern <span style={{ color: theme.accent }}>Next</span>
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: `${theme.ink}80`,
                }}
              >
                Verified internship program
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 18, width: "100%", maxWidth: 720 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div style={{ height: 1, background: `${theme.accentDeep}55` }} />
            <div
              style={{
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: theme.accentDeep,
                whiteSpace: "nowrap",
                padding: "0 4px",
              }}
            >
              Certificate of Completion
            </div>
            <div style={{ height: 1, background: `${theme.accentDeep}55` }} />
          </div>
        </div>

        <div style={{ marginTop: 20, maxWidth: 820 }}>
          <div
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: 12,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: `${theme.ink}70`,
              marginBottom: 8,
            }}
          >
            {theme.fieldLabel}
            {section ? ` · Section ${section}` : ""}
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: theme.ink,
            }}
          >
            {courseTitle}
          </h1>
          <p
            style={{
              margin: "8px 0 0",
              fontSize: 18,
              fontStyle: "italic",
              color: theme.accentDeep,
            }}
          >
            Remote Internship Certificate
          </p>
        </div>

        <div
          style={{
            marginTop: 22,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: 780,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: 13,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: `${theme.ink}75`,
            }}
          >
            This certifies that
          </p>
          <p
            style={{
              margin: "10px 0 0",
              fontSize: 42,
              fontWeight: 700,
              fontStyle: "italic",
              lineHeight: 1.1,
              color: theme.accentDeep,
              maxWidth: "100%",
              wordBreak: "break-word",
            }}
          >
            {studentName}
          </p>
          <div
            style={{
              marginTop: 10,
              width: 280,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
            }}
          />
          <p
            style={{
              margin: "14px 0 0",
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: 14,
              lineHeight: 1.55,
              color: `${theme.ink}b8`,
              maxWidth: 680,
            }}
          >
            has successfully completed all required Task Portal milestones and mentor-approved
            deliverables for the <strong style={{ color: theme.ink }}>{courseTitle}</strong>{" "}
            internship at Intern Next.
          </p>
        </div>

        <div
          style={{
            marginTop: 18,
            width: "100%",
            maxWidth: 860,
            display: "grid",
            gridTemplateColumns: "1fr 120px 1fr",
            alignItems: "end",
            gap: 28,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                minHeight: 48,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: 4,
              }}
            >
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-signature), 'Great Vibes', cursive",
                  fontSize: 38,
                  lineHeight: 1,
                  color: theme.accentDeep,
                  letterSpacing: "0.02em",
                }}
              >
                Musharib
              </span>
            </div>
            <div
              style={{
                height: 1.5,
                background: `${theme.accentDeep}66`,
                width: "100%",
              }}
            />
            <div
              style={{
                marginTop: 8,
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: `${theme.ink}80`,
              }}
            >
              Program Director
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <svg width="96" height="96" viewBox="0 0 96 96" aria-hidden>
              <defs>
                <linearGradient id={`seal-${uid}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fff7e6" />
                  <stop offset="45%" stopColor="#f0b429" />
                  <stop offset="100%" stopColor={theme.accentDeep} />
                </linearGradient>
              </defs>
              <circle cx="48" cy="48" r="44" fill={`url(#seal-${uid})`} />
              <circle cx="48" cy="48" r="36" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="2" />
              <circle cx="48" cy="48" r="28" fill={`${theme.accentDeep}20`} />
              <text
                x="48"
                y="45"
                textAnchor="middle"
                fill="#fff"
                fontFamily="Arial, Helvetica, sans-serif"
                fontSize="10"
                fontWeight="800"
                letterSpacing="1"
              >
                VERIFIED
              </text>
              <text
                x="48"
                y="60"
                textAnchor="middle"
                fill="#fff"
                fontFamily="Arial, Helvetica, sans-serif"
                fontSize="9"
                opacity="0.95"
              >
                {shortId}
              </text>
            </svg>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                minHeight: 36,
                borderBottom: `1.5px solid ${theme.accentDeep}66`,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: 6,
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: theme.ink,
              }}
            >
              {issuedLabel}
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: `${theme.ink}80`,
              }}
            >
              Date of Issue
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 16,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 10,
            color: `${theme.ink}70`,
            borderTop: `1px solid ${theme.accent}40`,
            paddingTop: 10,
          }}
        >
          <span>ID: {certificateId}</span>
          <span style={{ letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Authenticated by Intern Next
          </span>
          <span>Intern Next</span>
        </div>
      </div>
    </div>
  );
}
