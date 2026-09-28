"use client";

import { useEffect, useRef } from "react";

import { Icon } from "@/components/ui/icon";
import { sizeChart } from "@/lib/catalog";

export function SizeGuideModal({
  open,
  onClose,
  title = "Footwear Sizing Guide",
  note = "Measure your foot from heel to longest toe in the evening, when your feet are at their largest. If you sit between two sizes we recommend sizing up.",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  note?: string;
}) {
  // Callers pass an inline arrow, so keep it in a ref: otherwise the effect
  // below would tear down and re-add the keydown listener on every render.
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-gutter"
      onClick={onClose}
    >
      <div
        className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-xl bg-surface-container-lowest sm:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between gap-space-sm border-b border-outline-variant/60 bg-surface-container-lowest px-gutter py-space-md">
          <h2 className="font-headline-sm text-headline-sm font-semibold uppercase tracking-tight text-primary">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close size guide"
            className="flex h-9 w-9 items-center justify-center rounded-full text-primary transition-colors hover:bg-surface-container"
          >
            <Icon name="close" className="text-[20px]" />
          </button>
        </div>

        <div className="px-gutter py-space-md">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-outline-variant/60">
                {["UK", "Foot length", "US", "EU"].map((head) => (
                  <th
                    key={head}
                    scope="col"
                    className="py-2 font-label-md text-label-md uppercase tracking-widest text-secondary"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizeChart.map((row) => (
                <tr key={row.uk} className="border-b border-outline-variant/30 last:border-0">
                  <td className="py-2.5 font-label-lg text-label-lg text-primary">{row.uk}</td>
                  <td className="py-2.5 font-body-sm text-body-sm text-on-surface-variant">
                    {row.cm}
                  </td>
                  <td className="py-2.5 font-body-sm text-body-sm text-on-surface-variant">
                    {row.us}
                  </td>
                  <td className="py-2.5 font-body-sm text-body-sm text-on-surface-variant">
                    {row.eu}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-space-md rounded-lg bg-surface-container-low p-4 font-body-sm text-body-sm text-on-surface-variant">
            {note}
          </p>
        </div>
      </div>
    </div>
  );
}
