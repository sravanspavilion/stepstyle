import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/primitives";
import { getBestSellers } from "@/lib/catalog";

export default function NotFound() {
  const suggestions = getBestSellers();

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-gutter-mobile py-space-xl text-center md:px-margin">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-container">
        <Icon name="explore_off" className="text-[30px] text-secondary" />
      </span>

      <p className="mt-space-md font-label-md text-label-md uppercase tracking-[0.25em] text-secondary">
        Error 404
      </p>
      <h1 className="mt-2 font-display-mobile text-display-mobile font-semibold uppercase tracking-tight text-primary">
        This step went nowhere
      </h1>
      <p className="mt-3 max-w-md font-body-md text-body-md text-on-surface-variant">
        The page you were after has been moved or never existed. The rotation below is the safest
        place to land.
      </p>

      <div className="mt-space-lg flex flex-wrap items-center justify-center gap-space-sm">
        <Link
          href="/"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 font-label-lg text-label-lg uppercase tracking-wider text-on-primary transition-transform hover:scale-[1.01]"
        >
          Back home
        </Link>
        <Link
          href="/shoes"
          className="inline-flex h-12 items-center gap-2 rounded-full border border-primary px-7 font-label-lg text-label-lg uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-on-primary"
        >
          Shop all products
        </Link>
      </div>

      <ul className="mt-space-xl grid w-full grid-cols-1 gap-space-sm sm:grid-cols-3">
        {suggestions.map((product) => (
          <li key={product.id}>
            <Link
              href={`/shoes/${product.slug}`}
              className="flex h-full flex-col rounded-lg border border-outline-variant/50 p-4 text-left transition-colors hover:border-primary"
            >
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                Bestseller
              </span>
              <span className="mt-1 font-headline-sm text-headline-sm font-semibold text-primary">
                {product.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
