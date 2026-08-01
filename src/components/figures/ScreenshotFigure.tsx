// UI screenshot as a matted print, registered in mdx-components so any
// content body can place one.
//
// Why a hand-rolled <img> and not next/image: next.config sets
// `output: "export"` with `images: { unoptimized: true }`, so next/image
// emits a bare <img> with no srcset at all. The responsive work has to be
// done here, against the 1280w/1920w WebP pair that `npm run images` writes
// from assets-src/screenshots/.
//
// The mat is the same print idiom as the hero portrait and the CV sheet.
// A raw interface capture dropped straight onto the page reads as a pasted
// screenshot; framed, it reads as a plate. Deliberately no fake browser
// chrome: it fights the print language, and the real chrome is cropped off
// on purpose so a capture can never publish an internal hostname from the
// URL bar.

export function ScreenshotFigure({
  src,
  alt,
  caption,
  width,
  height,
  priority = false,
}: {
  /** Basename under /images, without the width suffix or extension. */
  src: string;
  /** Describe what the interface shows, not that it is a screenshot. */
  alt: string;
  caption?: string;
  /**
   * Intrinsic size of the 1280w variant, so the box is reserved up front.
   * Strings, not numbers: MDX drops `width={1600}` expression props on the
   * floor without warning, and the figure would then ship with no dimensions
   * and reintroduce the layout shift this exists to prevent. `width="1600"`
   * survives.
   */
  width: string;
  height: string;
  priority?: boolean;
}) {
  // Fail the build rather than silently ship a shifting image, since the MDX
  // call site is not typechecked.
  if (!width || !height) {
    throw new Error(
      `ScreenshotFigure(${src}): width and height are required. Pass them as ` +
        `strings (width="1600" height="1000"), not expressions (width={1600}), ` +
        `which MDX discards.`,
    );
  }
  const wide = `/images/${src}-1920.webp`;
  return (
    <figure className="figure-wide my-10">
      {/* Opens the full-resolution capture in a new tab: readable detail with
          no lightbox, no JavaScript, and it degrades to a plain link. */}
      <a
        href={wide}
        target="_blank"
        rel="noopener noreferrer"
        className="ui-shot block rounded-[6px] border border-line-strong bg-paper-raised p-2.5 shadow-[var(--shadow-print)]"
      >
        {/* next/image is the usual advice, but this site exports statically
            with images.unoptimized, so it would emit a bare <img> with no
            srcset at all. A hand-rolled srcset is strictly better here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/${src}-1280.webp`}
          srcSet={`/images/${src}-1280.webp 1280w, ${wide} 1920w`}
          sizes="(min-width: 1024px) 60rem, 100vw"
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-auto w-full rounded-[2px]"
        />
      </a>
      {caption && (
        <figcaption className="mt-3 max-w-[var(--measure)] text-sm text-ink-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
