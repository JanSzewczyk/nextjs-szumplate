# Next.js Szumplate

#### Hello there !!!

This is Next.js Szumplate, an open source template for enterprise projects! It is packed with features that will help you create an efficient, maintainable and enjoyable application. This template will save you a lot of time, so sit back, relax and get ready to conquer the whole world with your new awesome app! 🚀

## 📚 Features

This template has all the incredibles you need:

- 🏎️ **[Next.js](https://nextjs.org/)** - Fast by default, with config optimized for performance
- 💅 **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework
- 💻 **[T3 Env](https://env.t3.gg/)** - Manage your environment variables with ease
- ✨ **[ESlint](https://eslint.org/)** and **[Prettier](https://prettier.io/)** - For clean, consistent, and error-free code
- 🛠️ **[Extremely strict TypeScript](https://www.typescriptlang.org/)** - With [`ts-reset`](https://github.com/total-typescript/ts-reset) library for ultimate type safety
- 📊 **[Bundle analyzer plugin](https://www.npmjs.com/package/@next/bundle-analyzer)** - Keep an eye on your bundle size
- 🧪 **[Vitest](https://vitest.dev/)** and **[React Testing Library](https://testing-library.com/react)** - For rock-solid and highly speed unit and integration tests
- 🎭 **[Playwright](https://playwright.dev/)** - Write end-to-end tests like a pro
- 🎯 **[Absolute imports](https://nextjs.org/docs/advanced-features/module-path-aliases)** - No more spaghetti imports
- ⚕️ **[Health checks](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)** - Kubernetes-compatible for robust deployments
- 🤖 **[Dependabot](https://github.com/dependabot)** - Auto-checking dependencies, Dependabot will do it for you
- 🚢 **[Semantic Release](https://github.com/semantic-release/semantic-release)** - Fully configured tool for changelog, versioning and releasing app 😮
- 🚀 **[GitHub Actions](https://github.com/features/actions)** - Pre-configured actions for smooth workflows, including code review, PRs checks (test, e2e, Prettier, ESlint, and more...) and app releasing
- 🤖🧠 **[Automated ChatGPT Code Reviews](https://openai.com/chatgpt)** - **Stay on the cutting edge with AI-powered code reviews!**
- 💯 **Perfect Lighthouse score** - Because performance matters

## Table of Contents

- [Next.js Szumplate](#nextjs-szumplate)
  - [📚 Features](#-features)
  - [Table of Contents](#table-of-contents)
  - [🎯 Getting Started](#-getting-started)
  - [🚀 Deployment](#-deployment)
  - [📃 Scripts Overview](#-scripts-overview)
  - [🧪 Testing](#-testing)
    - [Running Tests](#running-tests)
  - [🎨 Styling and Design System](#-styling-and-design-system)
  - [🤖 ChatGPT Code Review](#-chatgpt-code-review)
  - [💻 Environment Variables handling](#-environment-variables-handling)
  - [🚀 Github Actions](#-github-actions)
  - [📜 License](#-license)

## 🎯 Getting Started

To get started with this boilerplate, follow these steps:

#### 1. Fork & clone repository:

```bash
## Don't forget to ⭐ star and fork it first :)
git clone https://github.com/<your_username)/nextjs-szumplate.git
```

#### 2. Install the dependencies:

```shell
npm ci
```

#### 3. Prepare project:

- To use fully configured [Semantic Release](https://github.com/semantic-release/semantic-release) feature, go to [`~/.github/workflows/publish.yml`](https://github.com/JanSzewczyk/nextjs-szumplate/blob/main/.github/workflows/publish.yml) file, then expose hidden code (lines from 26 to 30). After that you can enjoy all semantic-release and sharable configuration features (more details [HERE](https://www.npmjs.com/package/@szum-tech/semantic-release-preset)).
- Add the `OPENAI_API_KEY` to your [github actions secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets).

#### 4. Run the development server:

```shell
npm run dev
```

#### 5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 🚀 Deployment

Easily deploy your Next.js app with [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=github&utm_campaign=next-enterprise) by clicking the button below:

[![Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=github&utm_campaign=next-enterprise)

## 📃 Scripts Overview

The following scripts are available in the [`package.json`](./package.json):

- `analyze`: Analyzes the bundle sizes for Client, Server and Edge environments
- `build`: Builds the app for production
- `dev`: Starts the development server
- `e2e`: Runs end-to-end tests
- `e2e:ci`: Runs end-to-end tests for CI
- `e2e:ui`: Runs end-to-end tests with UI
- `lint`: Lints the code using ESLint
- `lint:ci`: Lints the code using ESLint for CI - considers warnings as errors
- `lint:fix`: Automatically fixes linting errors
- `prettier:check`: Checks the code for proper formatting
- `prettier:fix`: Automatically fixes formatting issues
- `start`: Starts the production server
- `test`: Runs unit and integration tests
- `test:coverage`: Runs and returns tests coverage report of unit and integration tests
- `test:watch`: Runs unit and integration tests in watch mode
- `type-check`: Runs types check

## 🧪 Testing

This szumplate comes with various testing setups to ensure your application's reliability and robustness.

### Running Tests

- **Unit and integration tests**: Run Vitest tests using `npm run test`
- **End-to-end tests**: Run Playwright tests with `npm run e2e`
- **End-to-end tests (UI mode)**: Run Playwright tests with UI using `npm run e2e:ui`

<img width="1665" alt="image" src="https://github.com/JanSzewczyk/nextjs-szumplate/assets/29024606/9c65cdd2-4e04-4687-81d6-8e7a32f12518">

## 🎨 Styling and Design System

This boilerplate uses Tailwind CSS for styling and [Szum-Tech Design System](https://www.npmjs.com/package/@szum-tech/design-system), which contains fully designed components, color palette, utils and more... ([Check DOCS](https://szum-tech-design-system.vercel.app/?path=/docs/introduction--docs))

## 🤖 ChatGPT Code Review

We've integrated the innovative [ChatGPT Code Review](https://github.com/anc95/ChatGPT-CodeReview) for AI-powered, automated code reviews. This feature provides real-time feedback on your code, helping improve code quality and catch potential issues.

To use ChatGPT Code Review, add an `OPENAI_API_KEY` environment variable with an appropriate key from the OpenAI platform. For setup details, refer to the [Using GitHub Actions](https://github.com/anc95/ChatGPT-CodeReview#using-github-actions) section in the documentation.

![image](https://user-images.githubusercontent.com/28964599/233685071-e1371edf-6359-41c3-a989-335d6ee09cb7.png)

## 💻 Environment Variables handling

[T3 Env](https://env.t3.gg/) is a library that provides environmental variables checking at build time, type validation and transforming. It ensures that your application is using the correct environment variables and their values are of the expected type. You’ll never again struggle with runtime errors caused by incorrect environment variable usage.

Config file is located at [`env.js`](./env.js). Simply set your client and server variables and import `env` from any file in your project.

```ts
const env = createEnv({
  server: {
    // Server variables
    SECRET_KEY: z.string()
  },
  client: {
    // Client variables
    API_URL: z.string().url()
  },
  runtimeEnv: {
    // Assign runtime variables
    SECRET_KEY: process.env.SECRET_KEY,
    API_URL: process.env.NEXT_PUBLIC_API_URL
  }
});
```

---

If the required environment variables are not set, you'll get an error message:

```shell
  ❌ Invalid environment variables: { SECRET_KEY: [ 'Required' ] }
```

## 🚀 Github Actions

Github Actions offer multiple smooth workflows that make development easier and reduce the developer's impact on repetitive and boring tasks.

### Code Review 🤖Flow

For more details, check paragraph [🤖 ChatGPT Code Review](#-chatgpt-code-review).

> Code of this workflow, you can find in [`code-review.yml`](./.github/workflows/code-review.yml) file.

### PR Checks ✅ Flow

This action is used only during pull request life, it validates the added code in terms of its correctness, preventing the merge of incorrect code.

**Checks the code for:**

- Build 🏗
- Prettier 🧹
- Eslint ⬣
- TypeScript 🛠️
- Test 🧪
- Playwright 🎭 (e2e tests)

<img width="1274" alt="image" src="https://github.com/JanSzewczyk/nextjs-szumplate/assets/29024606/755e0ce7-3a20-4860-b7c6-adbdedc954d4">

> Code of this workflow, you can find in [`pr-check.yml`](./.github/workflows/pr-check.yml) file.

### Publish 📦🚀

The action is triggered when a changes are added to the main branch `main`. It uses the [Semantic Release](https://github.com/semantic-release/semantic-release) library. Based on the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), it determines the next version of the application, boosts it in the [`package.json`](./package.json) file, adds information to the `CHANGELOG.md` file and creates a new [release on Github](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository).

The configuration used in Szumplate comes from the package [`@szum-tech/semantic-release-preset`](https://www.npmjs.com/package/@szum-tech/semantic-release-preset), which contains the shareable configurations used by the Semantic Release.

[Let's see configuration](https://github.com/JanSzewczyk/semantic-release-preset/blob/main/without-npm.js) used in this Repository.

> Code of this workflow, you can find in [`publish.yml`](./.github/workflows/publish.yml) file.

## 📜 License

This project is licensed under the MIT License. For more information, see the [LICENSE](./LICENSE) file.
