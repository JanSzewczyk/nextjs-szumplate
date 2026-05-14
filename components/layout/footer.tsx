import * as React from "react";

import { Github, Linkedin, Twitter } from "lucide-react";

import Link from "next/link";

const FOOTER_SECTIONS = [
  {
    title: "Produkt",
    links: [
      { label: "Funkcje", href: "/features" },
      { label: "Cennik", href: "/pricing" }
    ]
  },
  {
    title: "Firma",
    links: [
      { label: "O nas", href: "/about" },
      { label: "Kontakt", href: "/contact" }
    ]
  },
  {
    title: "Prawne",
    links: [
      { label: "Regulamin", href: "/terms" },
      { label: "Polityka Prywatności", href: "/privacy" }
    ]
  }
] as const;

const SOCIAL_LINKS = [
  {
    href: "https://github.com",
    label: "GitHub",
    icon: Github
  },
  {
    href: "https://twitter.com",
    label: "Twitter",
    icon: Twitter
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: Linkedin
  }
] as const;

/**
 * Footer component with responsive grid layout, navigation links, and social media icons.
 *
 * Features:
 * - Responsive 4-column grid (1 col mobile, 2 col tablet, 4 col desktop)
 * - Product, Company, and Legal sections with hover-interactive links
 * - Social media icons for GitHub, Twitter, and LinkedIn
 * - Branding section with logo and mission statement
 * - Copyright notice
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Branding Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg">
                <span className="text-sm font-bold">CF</span>
              </div>
              <span className="text-lg font-semibold">CraftFlow</span>
            </div>
            <p className="text-muted-foreground text-sm">Twoja praca, nasza technologia.</p>
          </div>

          {/* Navigation Sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">{section.title}</h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-all hover:translate-x-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-muted-foreground text-sm">© {currentYear} CraftFlow. Wszelkie prawa zastrzeżone.</p>

          {/* Social Icons */}
          <div className="flex gap-4">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="size-5" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
