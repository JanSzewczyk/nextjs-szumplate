import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button, Separator } from "@szum-tech/design-system";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-between gap-16 px-4 py-10 sm:px-12 sm:py-24">
      <div className="flex w-full flex-row justify-end">
        <Button asChild endIcon={<GitHubLogoIcon />}>
          <a target="_blank" href="https://github.com/JanSzewczyk/nextjs-szumplate" rel="noreferrer">
            See Repo
          </a>
        </Button>
      </div>

      <div className="flex flex-col">
        <h1 className="text-heading-3 lg:text-heading-2 mb-4 text-center">Next App Template</h1>
        <p className="text-subtitle-1 self-end text-gray-600 underline">by Szum-Tech</p>
      </div>

      <div className="w-full space-y-8">
        <h2 className="text-heading-5 lg:text-heading-4 text-center text-gray-400">Tech stack</h2>
        <Separator />
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
            },
            {
              alt: "Storybook",
              src: "/storybook.svg",
              href: "https://storybook.js.org/"
            }
          ].map((img) => (
            <li key={img.href} className="rounded-sm bg-gray-800">
              <a
                href={img.href}
                target="_blank"
                className="relative flex h-20 w-36 justify-center grayscale transition hover:grayscale-0 focus:grayscale-0"
                rel="noreferrer"
              >
                <Image className="p-2" width={200} height={200} src={img.src} alt={img.alt} priority />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
