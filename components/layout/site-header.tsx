"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useSyncExternalStore, type FormEvent } from "react";

import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";
import { navItems, promo } from "@/lib/catalog";
import { useStore } from "@/lib/store";

const ANNOUNCEMENT_KEY = "stepstyle.announcement.v1";
const ANNOUNCEMENT_EVENT = "stepstyle:announcement";

function subscribeAnnouncement(onChange: () => void) {
  window.addEventListener(ANNOUNCEMENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(ANNOUNCEMENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readAnnouncement(): string {
  try {
    return localStorage.getItem(ANNOUNCEMENT_KEY) === "hidden" ? "hidden" : "visible";
  } catch {
    return "visible";
  }
}

/**
 * The dismissal lives in localStorage; the pre-paint script in `app/layout.tsx`
 * already flipped the `data-announcement` attribute so there is no flash.
 */
function useAnnouncement() {
  const mode = useSyncExternalStore(subscribeAnnouncement, readAnnouncement, () => "visible");

  // Mirroring state into the DOM is exactly what effects are for.
  useEffect(() => {
    document.documentElement.dataset.announcement = mode;
  }, [mode]);

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(ANNOUNCEMENT_KEY, "hidden");
    } catch {
      /* private mode — the strip just comes back next visit */
    }
    window.dispatchEvent(new Event(ANNOUNCEMENT_EVENT));
  }, []);

  return { hidden: mode === "hidden", dismiss };
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount, wishlist, ready } = useStore();
  const announcement = useAnnouncement();

  const [query, setQuery] = useState("");
  // Panels close by comparing the path they were opened on, so no effect is
  // needed to "reset on navigation".
  const [panels, setPanels] = useState<{ menu: boolean; search: boolean; at: string }>({
    menu: false,
    search: false,
    at: pathname,
  });
  const menuOpen = panels.menu && panels.at === pathname;
  const searchOpen = panels.search && panels.at === pathname;

  function openPanel(name: "menu" | "search", next: boolean) {
    setPanels({ menu: name === "menu" ? next : false, search: name === "search" ? next : false, at: pathname });
  }

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = query.trim();
    if (!q) return;
    openPanel("search", false);
    router.push(`/shoes?q=${encodeURIComponent(q)}`);
  }

  const wishlistCount = ready ? wishlist.length : 0;
  const bagCount = ready ? itemCount : 0;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* announcement strip — 2.25rem */}
      <div
        className={`overflow-hidden bg-primary text-on-primary transition-[height] duration-300 ${
          announcement.hidden ? "h-0" : "h-9"
        }`}
      >
        <div className="relative mx-auto flex h-9 max-w-[1600px] items-center justify-center gap-3 px-gutter-mobile text-center font-label-sm text-label-sm uppercase tracking-widest md:px-margin">
          <span className="truncate">
            Free express shipping over ₹999 &middot; 7-day instant returns
          </span>
          <span aria-hidden="true" className="hidden h-3 w-px bg-on-primary/30 sm:block" />
          <span className="hidden items-center gap-1.5 sm:flex">
            <Icon name="sell" className="text-[14px]" />
            Use code{" "}
            <strong className="font-label-lg text-label-lg">{promo.code}</strong>
          </span>
          <button
            type="button"
            onClick={announcement.dismiss}
            aria-label="Dismiss announcement"
            className="absolute right-4 flex h-6 w-6 items-center justify-center rounded-full text-on-primary/70 transition-colors hover:bg-on-primary/15 hover:text-on-primary md:right-6"
          >
            <Icon name="close" className="text-[16px]" />
          </button>
        </div>
      </div>

      {/* main nav — 5rem */}
      <div className="border-b border-outline-variant/60 bg-surface/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center gap-gutter px-gutter-mobile md:px-margin">
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => openPanel("menu", !menuOpen)}
            className="-ml-1 flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-surface-container lg:hidden"
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>

          <Link href="/" aria-label="STEPSTYLE home" className="flex shrink-0 items-center">
            <Logo width={112} priority />
          </Link>

          <nav aria-label="Primary" className="hidden flex-1 items-center justify-center lg:flex">
            <ul className="flex items-center gap-space-lg">
              {navItems.map((item) => {
                // nav hrefs carry query strings (?tab=new), so compare the path
                const active = pathname === item.href.split("?")[0];
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`group relative flex items-center gap-1 py-2 font-label-lg text-label-lg uppercase tracking-wider transition-colors ${
                        active ? "text-primary" : "text-on-surface-variant hover:text-primary"
                      }`}
                    >
                      {item.label}
                      {item.flag && (
                        <span className="rounded-sm bg-error px-1.5 py-0.5 font-label-sm text-label-sm text-on-error">
                          {item.flag}
                        </span>
                      )}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-200 group-hover:scale-x-100 ${
                          active ? "scale-x-100" : ""
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-space-xs">
            <button
              type="button"
              aria-label="Search"
              aria-expanded={searchOpen}
              onClick={() => openPanel("search", !searchOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-surface-container"
            >
              <Icon name="search" />
            </button>

            <Link
              href="/shoes?tab=featured"
              aria-label={`Wishlist, ${wishlistCount} item${wishlistCount === 1 ? "" : "s"}`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-surface-container"
            >
              <Icon name="favorite" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 font-label-sm text-label-sm text-on-error">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              aria-label={`Shopping bag, ${bagCount} item${bagCount === 1 ? "" : "s"}`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-surface-container"
            >
              <Icon name="shopping_bag" />
              {bagCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 font-label-sm text-label-sm text-on-primary">
                  {bagCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {searchOpen && (
          <form onSubmit={onSearch} className="border-t border-outline-variant/60 bg-surface-container-lowest">
            <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-space-sm px-gutter-mobile md:px-margin">
              <Icon name="search" className="text-[20px] text-secondary" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for sneakers, loafers, overshirts…"
                aria-label="Search products"
                className="flex-1 bg-transparent font-body-md text-body-md text-on-surface outline-none placeholder:text-secondary/70"
              />
              <button
                type="submit"
                className="rounded-full bg-primary px-5 py-2 font-label-lg text-label-lg uppercase tracking-wider text-on-primary transition-opacity hover:opacity-85"
              >
                Search
              </button>
            </div>
          </form>
        )}
      </div>

      {menuOpen && (
        <nav
          aria-label="Mobile"
          className="border-b border-outline-variant/60 bg-surface-container-lowest shadow-lg lg:hidden"
        >
          <ul className="mx-auto max-w-[1600px] px-gutter-mobile py-space-md md:px-margin">
            {navItems.map((item) => (
              <li key={item.label} className="border-b border-outline-variant/40 last:border-0">
                <Link
                  href={item.href}
                  className="flex items-center justify-between py-3 font-headline-sm text-headline-sm font-semibold uppercase text-primary"
                >
                  {item.label}
                  <Icon name="arrow_forward" className="text-[18px] text-secondary" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
