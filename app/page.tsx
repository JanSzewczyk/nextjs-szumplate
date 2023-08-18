import Image from "next/image";

import { Button } from "@szum-tech/design-system";
import { IconBrandGithub } from "@szum-tech/design-system/icons";

export default function Home() {
  return (
    <main className="mx-auto container flex min-h-screen flex-col items-center justify-between gap-16 py-10 sm:py-24 px-4 sm:px-12">
      <div className="w-full flex flex-row justify-end">
        <Button
          as="a"
          target="_blank"
          href="https://github.com/JanSzewczyk/nextjs-szumplate"
          endIcon={<IconBrandGithub />}
        >
          See Repo
        </Button>
      </div>

      <div className="flex flex-col">
        <h1 className="typography-heading-3 lg:typography-heading-2 text-center mb-4">
          Next App Template
        </h1>
        <p className="typography-subtitle-1 text-gray-300 self-end">by Szum-Tech</p>
      </div>

      <div className="w-full">
        <h2 className="typography-heading-5 lg:typography-heading-4 text-center text-gray-200 py-4 border-b border-b-gray-400 mb-8">
          Tech stack
        </h2>
        <ul className="flex flex-wrap justify-center gap-4">
          {[
            { alt: "Next", src: "/next.svg", href: "https://nextjs.org" },
            { alt: "TailwindCSS", src: "/tailwindcss.svg", href: "https://tailwindcss.com" },
            { alt: "TypeScript", src: "/typescript.svg", href: "https://typescriptlang.org" },
            { alt: "Playwright", src: "/playwright.svg", href: "https://playwright.dev" },
            { alt: "Vitest", src: "vitest.svg", href: "https://vitest.dev" },
            {
              alt: "Testing Library",
              src: "/testing-library.svg",
              href: "https://testing-library.com"
            },
            { alt: "Prettier", src: "/prettier.svg", href: "https://prettier.io" },
            { alt: "ESLint", src: "/eslint.svg", href: "https://eslint.org" },
            {
              alt: "Semantic Release",
              src: "/semantic-release.svg",
              href: "https://semantic-release.gitbook.io/semantic-release"
            },
            {
              alt: "T3 ENV",
              src: "/t3.svg",
              href: "https://env.t3.gg/"
            }
          ].map((img) => (
            <li key={img.href} className="bg-gray-400 rounded-sm">
              <a
                href={img.href}
                target="_blank"
                className="relative flex w-36 h-20 justify-center grayscale transition hover:grayscale-0 focus:grayscale-0"
              >
                <Image className="p-2" fill src={img.src} alt={img.alt} priority />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
