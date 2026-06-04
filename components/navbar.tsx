"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, LogOut, User } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-4">
        <Link
          href="/"
          className="group flex items-center gap-2 text-xl font-semibold tracking-tight"
        >
          <span className="text-primary inline-block transition-transform duration-500 ease-[var(--ease-spring)] group-hover:rotate-180 group-hover:scale-110">
            &#10022;
          </span>
          <span className="transition-colors group-hover:text-primary">
            {siteConfig.name}
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={active}
                className="link-underline text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground data-[active=true]:text-foreground"
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="font-medium">{session.user?.name || session.user?.email}</span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-secondary hover:border-primary/30"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 ease-[var(--ease-out-soft)] hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40"
            >
              Join Community
            </Link>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-out",
          mobileOpen ? "max-h-80" : "max-h-0"
        )}
      >
        <div className="flex flex-col gap-4 px-6 pb-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {session ? (
            <>
              <div className="flex items-center gap-2 text-sm text-foreground pt-2 border-t border-border">
                <User className="h-4 w-4 text-primary" />
                <span>{session.user?.name || session.user?.email}</span>
              </div>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors w-fit"
            >
              Join Community
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
