"use client";

import { useRef, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  CertificateDocument,
  type CertificateDocumentProps,
} from "@/components/certificates/CertificateDocument";
import { certificateFileName } from "@/lib/certificates";

export function DownloadCertificateButton({
  studentName,
  courseTitle,
  courseSlug,
  issuedAt,
  certificateId,
  section,
}: CertificateDocumentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onDownload() {
    if (!ref.current) return;
    setBusy(true);
    setError(null);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(ref.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [1122, 794],
        compress: true,
      });
      pdf.addImage(img, "PNG", 0, 0, 1122, 794);
      pdf.save(certificateFileName(courseTitle, studentName));
    } catch {
      setError("Could not generate PDF. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div
        aria-hidden
        style={{
          position: "fixed",
          left: -10000,
          top: 0,
          pointerEvents: "none",
          opacity: 1,
        }}
      >
        <div ref={ref}>
          <CertificateDocument
            studentName={studentName}
            courseTitle={courseTitle}
            courseSlug={courseSlug}
            issuedAt={issuedAt}
            certificateId={certificateId}
            section={section}
          />
        </div>
      </div>

      <Button type="button" variant="secondary" disabled={busy} onClick={() => void onDownload()}>
        <Download className="h-4 w-4" />
        {busy ? "Preparing PDF…" : "Download certificate"}
      </Button>
      {error && <p className="mt-2 text-sm text-danger">{error}</p>}
    </div>
  );
}
