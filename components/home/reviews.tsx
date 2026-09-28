import { Icon, StarRow } from "@/components/ui/icon";
import { Link } from "@/components/ui/primitives";
import { editorialReviews } from "@/lib/catalog";

export function Reviews() {
  return (
    <section className="bg-surface-container-low py-space-xl">
      <div className="mx-auto max-w-[1600px] px-gutter-mobile md:px-margin">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-2 block font-label-sm text-label-sm font-bold uppercase tracking-widest text-secondary">
              Field notes
            </span>
            <h2 className="font-headline-lg text-headline-lg font-bold uppercase tracking-tight text-primary">
              Worn, tested, repeated
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <StarRow rating={4.9} iconClass="text-[20px]" />
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              <strong className="text-primary">4.9 / 5</strong> &middot; 2,418 verified reviews
            </span>
          </div>
        </div>

        <ul className="mt-space-xl grid grid-cols-1 gap-space-md md:grid-cols-3">
          {editorialReviews.map((review) => (
            <li
              key={review.author}
              className="flex flex-col justify-between rounded-lg bg-surface-container-lowest p-gutter"
            >
              <Icon name="format_quote" className="text-[28px] text-secondary/40" />
              <blockquote className="mt-space-sm flex-1 font-body-md text-body-md text-on-surface">
                {review.quote}
              </blockquote>
              <footer className="mt-space-md border-t border-outline-variant/40 pt-space-sm">
                <cite className="block font-headline-sm text-headline-sm not-italic font-semibold text-primary">
                  {review.author}
                </cite>
                <span className="font-body-sm text-body-sm text-secondary">{review.role}</span>
              </footer>
            </li>
          ))}
        </ul>

        <div className="mt-space-lg flex justify-center">
          <Link
            href="/shoes?tab=featured"
            className="inline-flex items-center gap-2 font-label-lg text-label-lg uppercase tracking-wider text-primary underline-offset-4 hover:underline"
          >
            Read all reviews
            <Icon name="arrow_forward" className="text-[18px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
