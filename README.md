<div align="center">

# 🚀 Next.js Szumplate

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=github&utm_campaign=next-enterprise)
[![GitHub stars](https://img.shields.io/github/stars/JanSzewczyk/nextjs-szumplate?style=social)](https://github.com/JanSzewczyk/nextjs-szumplate/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**An enterprise-ready Next.js template that accelerates your development workflow**

[Features](#-features) • [Getting Started](#-getting-started) • [Documentation](#-table-of-contents) •
[Deployment](#-deployment)

</div>

---

## 👋 Hello there!

This is **Next.js Szumplate**, an open-source template for enterprise projects! It is packed with features that will
help you create an efficient, maintainable, and enjoyable application. This template will save you a lot of time, so sit
back, relax, and get ready to conquer the whole world with your new awesome app!

## ✨ Features

### 🏗️ Core Technologies

- **⚡ [Next.js](https://nextjs.org/)** - Fast by default, with config optimized for performance
- **💅 [Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework
- **🛠️ Extremely strict [TypeScript](https://www.typescriptlang.org/)** - With `ts-reset` library for ultimate type
  safety
- **🎯 [Absolute imports](https://nextjs.org/docs/advanced-features/module-path-aliases)** - No more spaghetti imports

### 🧪 Testing & Quality

- **🧪 [Vitest](https://vitest.dev/)** - Rock-solid and highly speed unit and integration tests
- **🧬 [React Testing Library](https://testing-library.com/react)** - Component testing
- **🎭 [Playwright](https://playwright.dev/)** - End-to-end tests with smoke testing and acceptance tests
- **📚 [Storybook](https://storybook.js.org/)** - Create, test, and showcase your components
- **✨ [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)** - Clean, consistent, and error-free code

### 🤖 Automation & DevOps

- **🚀 [GitHub Actions](https://github.com/features/actions)** - Pre-configured workflows for CI/CD
- **🚢 [Semantic Release](https://github.com/semantic-release/semantic-release)** - Automated versioning and changelog
  generation
- **🤖 [Dependabot](https://github.com/dependabot)** - Automated dependency updates
- **🧠 [ChatGPT Code Reviews](https://openai.com/chatgpt)** - AI-powered code reviews

### 🔧 Developer Experience

- **💻 [T3 Env](https://env.t3.gg/)** - Type-safe environment variables management
- **📊 [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)** - Keep an eye on your bundle size
- **⚕️
  [Health Checks](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)** -
  Kubernetes-compatible for robust deployments
- **🎨 [Szum-Tech Design System](https://www.npmjs.com/package/@szum-tech/design-system)** - Pre-built components and
  design tokens

### 🏆 Performance

- **💯 Perfect Lighthouse Score** - Optimized for performance, accessibility, and SEO

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [📖 Table of Contents](#-table-of-contents)
- [🎯 Getting Started](#-getting-started)
- [🚀 Deployment](#-deployment)
- [📃 Scripts Overview](#-scripts-overview)
- [🧪 Testing](#-testing)
- [🎨 Styling and Design System](#-styling-and-design-system)
- [🤖 ChatGPT Code Review](#-chatgpt-code-review)
- [💻 Environment Variables Handling](#-environment-variables-handling)
- [🚀 GitHub Actions](#-github-actions)
- [🔒 Keeping Server-only Code out of the Client Environment](#-keeping-server-only-code-out-of-the-client-environment)
- [📁 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)
- [📧 Contact & Support](#-contact--support)

---

## 🎯 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.x or higher recommended)
- **npm**, **yarn**, or **pnpm** package manager
- **Git** for version control

### Installation

Follow these steps to get started:

#### 1. ⭐ Star and Fork the Repository

Don't forget to star ⭐ and fork the repository first!

#### 2. 📥 Clone the Repository

```bash
git clone https://github.com/<your_username>/nextjs-szumplate.git
cd nextjs-szumplate
```

#### 3. 📦 Install Dependencies

```bash
npm ci
```

#### 4. ⚙️ Configure Environment Variables

Create a `.env.local` file in the root directory and add your environment variables:

```env
# Add your environment variables here
# NEXT_PUBLIC_API_URL=your_api_url
```

#### 5. 🚀 Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Optional Configuration

#### Semantic Release Setup

To use the fully configured [Semantic Release](https://github.com/semantic-release/semantic-release) feature:

1. Go to `.github/workflows/publish.yml` file
2. Expose hidden code (lines 26 to 30)
3. Enjoy automated versioning and changelog generation
   ([more details](https://www.npmjs.com/package/@szum-tech/semantic-release-preset))

#### ChatGPT Code Review Setup

Add the `OPENAI_API_KEY` to your
[GitHub Actions secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) to enable AI-powered code
reviews.

---

## 🚀 Deployment

Easily deploy your Next.js app with **Vercel** by clicking the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=github&utm_campaign=next-enterprise)

### Deployment Steps

1. Click the "Deploy with Vercel" button
2. Connect your GitHub repository
3. Configure environment variables
4. Deploy!

Your application will be live in minutes with automatic CI/CD pipeline.

---

## 📃 Scripts Overview

The following scripts are available in the `package.json`:

### Development

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run start` - Starts the production server

### Code Quality

- `npm run lint` - Lints the code using ESLint
- `npm run lint:ci` - Lints the code for CI (treats warnings as errors)
- `npm run lint:fix` - Automatically fixes linting errors
- `npm run prettier:check` - Checks the code for proper formatting
- `npm run prettier:fix` - Automatically fixes formatting issues
- `npm run type-check` - Runs TypeScript type checking

### Testing

- `npm run test` - Runs unit and integration tests
- `npm run test:ci` - Runs tests for CI environment
- `npm run test:coverage` - Generates test coverage report
- `npm run test:unit` - Runs unit tests only
- `npm run test:watch` - Runs tests in watch mode
- `npm run test:ui` - Runs tests with UI

### E2E Testing

- `npm run e2e` - Runs end-to-end tests
- `npm run e2e:ci` - Runs E2E tests for CI
- `npm run e2e:ui` - Runs E2E tests with Playwright UI

### Storybook

- `npm run storybook:dev` - Starts Storybook in development mode
- `npm run storybook:build` - Builds Storybook for production
- `npm run storybook:serve` - Serves the built Storybook
- `npm run test:storybook` - Runs Storybook tests

### Analysis

- `npm run analyze` - Analyzes bundle sizes for Client, Server, and Edge environments

---

## 🧪 Testing

This template comes with a comprehensive testing setup to ensure your application's reliability and robustness.

### Unit & Integration Tests

Run Vitest tests using:

```bash
npm run test
```

For watch mode:

```bash
npm run test:watch
```

Generate coverage report:

```bash
npm run test:coverage
```

### End-to-End Tests

Run Playwright E2E tests:

```bash
npm run e2e
```

Run with UI for debugging:

```bash
npm run e2e:ui
```

<img width="1665" alt="image" src="https://github.com/JanSzewczyk/nextjs-szumplate/assets/29024606/9c65cdd2-4e04-4687-81d6-8e7a32f12518">

### Storybook Tests

Run Storybook component tests:

```bash
npm run test:storybook
```

### Acceptance Tests

To write acceptance tests, we leverage Storybook's
[play function](https://storybook.js.org/docs/writing-stories/play-function#writing-stories-with-the-play-function).
This allows you to interact with your components and test various user flows within Storybook.

---

## 🎨 Styling and Design System

This boilerplate uses **Tailwind CSS** for styling and the
**[Szum-Tech Design System](https://www.npmjs.com/package/@szum-tech/design-system)**, which contains:

- ✅ Fully designed components
- 🎨 Color palette and design tokens
- 🛠️ Utility functions and helpers
- 📖 Comprehensive documentation

**[Check the Design System Documentation](https://szum-tech-design-system.vercel.app/?path=/docs/components--docs)**

### Usage Example

```tsx
import { Button } from "@szum-tech/design-system";

export default function MyComponent() {
  return <Button variant="primary">Click me!</Button>;
}
```

---

## 🤖 ChatGPT Code Review

We've integrated the innovative [ChatGPT Code Review](https://github.com/anc95/ChatGPT-CodeReview) for AI-powered,
automated code reviews. This feature provides real-time feedback on your code, helping improve code quality and catch
potential issues.

### Setup

1. Generate an API key from [OpenAI Platform](https://platform.openai.com/)
2. Add `OPENAI_API_KEY` as a secret in your GitHub repository settings
3. The workflow will automatically run on every pull request

For detailed setup instructions, refer to the
[Using GitHub Actions](https://github.com/anc95/ChatGPT-CodeReview#using-github-actions) section in the documentation.

![image](https://user-images.githubusercontent.com/28964599/233685071-e1371edf-6359-41c3-a989-335d6ee09cb7.png)

---

## 💻 Environment Variables Handling

[T3 Env](https://env.t3.gg/) provides type-safe environment variable management with build-time validation. It ensures
that your application uses correct environment variables and their values are of the expected type.

### Configuration

The config file is located at `data/env/{client,server}.ts`:

```typescript
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
  server: {
    // Server-side variables
    SECRET_KEY: z.string()
  },
  client: {
    // Client-side variables (must be prefixed with NEXT_PUBLIC_)
    API_URL: z.string().url()
  },
  runtimeEnv: {
    // Assign runtime variables
    SECRET_KEY: process.env.SECRET_KEY,
    API_URL: process.env.NEXT_PUBLIC_API_URL
  }
});

export default env;
```

### Benefits

- ✅ Type-safe environment variables
- ✅ Build-time validation
- ✅ Runtime error prevention
- ✅ Auto-completion in your IDE

If required environment variables are not set, you'll get a clear error message:

```
❌ Invalid environment variables: { SECRET_KEY: [ 'Required' ] }
```

---

## 🚀 GitHub Actions

GitHub Actions offer multiple smooth workflows that make development easier and reduce the developer's impact on
repetitive tasks.

### Available Workflows

#### 1. 🤖 ChatGPT Code Review (`code-review.yml`)

Provides AI-powered code reviews on every pull request.

#### 2. ✅ PR Check (`pr-check.yml`)

Validates code on every pull request, checking:

- 🏗️ **Build** - Ensures the project builds successfully
- 🧹 **Prettier** - Code formatting validation
- ⬣ **ESLint** - Code quality and linting
- 🛠️ **TypeScript** - Type checking
- 🧪 **Tests** - Unit and integration tests
- 🎭 **Playwright** - E2E tests

#### 3. 🚢 Publish (`publish.yml`)

Automatically triggered when changes are merged to the `main` branch:

- 📦 Determines next version using [Semantic Release](https://github.com/semantic-release/semantic-release)
- 📝 Updates `CHANGELOG.md`
- 🏷️ Creates GitHub release
- 🔢 Bumps version in `package.json`

Based on [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), this workflow uses
[@szum-tech/semantic-release-preset](https://www.npmjs.com/package/@szum-tech/semantic-release-preset) configuration.

---

## 🔒 Keeping Server-only Code out of the Client Environment

Since JavaScript modules can be shared between both Server and Client Components, it's possible for server-only code to
accidentally be included in the client bundle.

### Solution: `server-only` Package

Use the [server-only](https://www.npmjs.com/package/server-only) package to give developers a build-time error if they
accidentally import server code into a Client Component.

```bash
npm install server-only
```

Then import it in any module that contains server-only code:

```typescript
import "server-only";

// The rest of your server-only code
export async function getData() {
  // This function can only be used on the server
}
```

---

## 📁 Project Structure

```
nextjs-szumplate/
├── .github/
│   └── workflows/        # GitHub Actions workflows (CI/CD)
├── .storybook/           # Storybook configuration
├── app/                  # Next.js App Router (pages, layouts, API routes)
├── components/           # Reusable React components
├── data/                 # Static data and constants
├── features/             # Feature-based modules and logic
├── lib/                  # Utility functions and helpers
├── public/               # Static assets (images, fonts, icons)
├── stories/              # Storybook stories
├── tests/                # Test files
│   ├── e2e/              # Playwright end-to-end tests
│   └── unit/             # Vitest unit tests
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
├── .env.example          # Example environment variables template
├── eslint.config.mjs     # ESLint configuration
├── next.config.ts        # Next.js configuration
├── playwright.config.ts  # Playwright E2E test configuration
├── postcss.config.js     # PostCSS configuration
├── prettier.config.js    # Prettier configuration
├── release.config.js     # Semantic Release configuration
├── tsconfig.json         # TypeScript configuration
├── vitest.config.ts      # Vitest test configuration
└── package.json          # Project dependencies and scripts
```

### Key Directories

- **`.github/workflows/`** - CI/CD automation (code review, PR checks, releases)
- **`.storybook/`** - Storybook setup for component development and documentation
- **`app/`** - Next.js 15 App Router with server/client components, layouts, and API routes
- **`components/`** - Shared, reusable UI components used across the application
- **`data/`** - Static data, constants, and configuration files
- **`features/`** - Feature-based modules with related components and logic (modular architecture)
- **`lib/`** - Utility functions, helpers, and third-party library configurations
- **`public/`** - Static files served directly (images, fonts, favicon, etc.)
- **`stories/`** - Storybook stories for component documentation and testing
- **`tests/e2e/`** - End-to-end tests using Playwright for full user flow testing
- **`tests/unit/`** - Unit tests using Vitest and React Testing Library
- **`types/`** - Global TypeScript type definitions and interfaces
- **`utils/`** - General utility functions and helpers

### Important Configuration Files

- **`eslint.config.mjs`** - ESLint linting rules and plugins
- **`next.config.ts`** - Next.js framework configuration (build, plugins, Turbopack, etc.)
- **`playwright.config.ts`** - Playwright E2E testing configuration
- **`postcss.config.js`** - PostCSS plugins and Tailwind CSS processing
- **`prettier.config.js`** - Code formatting rules and preferences
- **`release.config.js`** - Semantic Release automation configuration
- **`tsconfig.json`** - TypeScript compiler options and path aliases
- **`vitest.config.ts`** - Vitest unit test configuration and setup

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure your code passes all tests and follows the project's coding standards.

---

## 📜 License

This project is licensed under the **MIT License**. For more information, see the [LICENSE](LICENSE) file.

---

## 🙏 Acknowledgments

This template is built with amazing tools and libraries from the open-source community:

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Vitest](https://vitest.dev/) - Next generation testing framework
- [Playwright](https://playwright.dev/) - E2E testing framework
- [Storybook](https://storybook.js.org/) - UI component explorer
- And many more amazing libraries!

---

## 📧 Contact & Support

If you have any questions, suggestions, or issues:

- 🐛 [Open an issue](https://github.com/JanSzewczyk/nextjs-szumplate/issues)
- ⭐ [Star this repository](https://github.com/JanSzewczyk/nextjs-szumplate)
- 👨‍💻 Check out my [GitHub profile](https://github.com/JanSzewczyk)

---

<div align="center">

**Made with ❤️ by [Szum-Tech](https://github.com/szum-tech)**

If this template helped you, please consider giving it a ⭐ on GitHub!

[⬆ Back to Top](#-nextjs-szumplate)

</div>
