import Image from "next/image";

import { LOGO_CANVAS, LOGO_INK, LOGO_SRC } from "@/lib/catalog";

/**
 * The wordmark ships inside a square canvas with a lot of transparent padding
 * (see `LOGO_INK`). Rendering that square directly shrinks the letterforms to
 * about 13% of the box — technically a valid `next/image`, but the brand mark
 * ends up an illegible ~3px smudge at header size.
 *
 * So we crop: an `overflow-hidden` wrapper sized to the ink box, containing the
 * full canvas scaled up and pulled back by the measured padding. Percentage
 * margins and widths resolve against the wrapper's *width*, which is what lets
 * the whole thing scale from a single `width` prop with no magic pixel values.
 */
export function Logo({
  width = 112,
  priority = false,
  className = "",
}: {
  /** Rendered width of the visible wordmark, in pixels. */
  width?: number;
  priority?: boolean;
  className?: string;
}) {
  const scale = LOGO_CANVAS / LOGO_INK.width;
  // Percentage sizing would be tidier, but a global `img { max-width: 100% }`
  // reset clamps the image back to the wrapper width. Compute in pixels against
  // the known wrapper width and opt out of the clamp explicitly.
  const imgWidth = width * scale;

  return (
    <span
      className={`block overflow-hidden ${className}`}
      style={{ width, aspectRatio: `${LOGO_INK.width} / ${LOGO_INK.height}` }}
    >
      <Image
        src={LOGO_SRC}
        alt="STEPSTYLE"
        width={LOGO_CANVAS}
        height={LOGO_CANVAS}
        priority={priority}
        className="block"
        style={{
          width: imgWidth,
          height: imgWidth,
          maxWidth: "none",
          // Slide the canvas onto the ink box.
          marginLeft: -(width * LOGO_INK.x) / LOGO_INK.width,
          marginTop: -(width * LOGO_INK.y) / LOGO_INK.width,
        }}
      />
    </span>
  );
}
