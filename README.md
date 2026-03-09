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
- **📝 [Pino](https://getpino.io/)** - High-performance structured logging with development and production modes

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
- [📝 Logging](#-logging)
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

- **Bun** (version 1.1.x or higher recommended) - Primary runtime for optimal performance
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

#### 3. 📦 Install Dependencies with Bun

```bash
bun install
```

#### 4. ⚙️ Configure Environment Variables

Create a `.env.local` file in the root directory and add your environment variables:

```env
# Add your environment variables here
# NEXT_PUBLIC_API_URL=your_api_url
```

#### 5. 🚀 Start Development Server with Bun

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Alternative: Node.js/npm

This project also supports Node.js 24.x and npm if needed:

```bash
npm install
npm run dev
```

**Why use Bun?**

- 🚀 10-100x faster package installation
- ⚡ 2-3x faster dev server startup
- 🎯 Native TypeScript support
- 💎 Drop-in Node.js compatibility

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

## 📝 Logging

This template uses **[Pino](https://getpino.io/)**, one of the fastest and most popular logging libraries for Node.js,
to provide structured logging throughout the application.

### Features

- ✅ **High Performance** - Minimal overhead with extremely fast JSON logging
- ✅ **Structured Logging** - JSON-formatted logs for easy parsing and analysis
- ✅ **Next.js Compatible** - Optimized to work with Next.js App Router and Turbopack
- ✅ **Universal Support** - Works on both server-side and client-side (browser)
- ✅ **Production Ready** - JSON logs optimized for log aggregation tools (Datadog, ELK, CloudWatch)
- ✅ **Request Tracking** - Automatic request ID generation and logging via middleware
- ✅ **Error Handling** - Integrated with global error boundaries for comprehensive error logging
- ✅ **Type-safe Configuration** - LOG_LEVEL environment variable with TypeScript validation

### Configuration

The logger is configured in `lib/logger.ts` and automatically adapts based on the environment:

**Server-side (Node.js):**

- Structured JSON output for both development and production
- ISO timestamps for consistency
- Includes PID and hostname in development mode
- Direct stdout logging for optimal performance

**Client-side (Browser):**

- Fallback to browser console with appropriate log levels
- Fatal/Error → `console.error()`
- Warn → `console.warn()`
- Info → `console.info()`
- Debug/Trace → `console.debug()`

**Technical Note:** This implementation doesn't use `pino-pretty` transport to avoid worker thread issues with
Next.js/Turbopack. The logs remain fully structured and parseable as JSON, making them ideal for production environments
and log aggregation services.

### Log Levels

Set the `LOG_LEVEL` environment variable to control verbosity:

```bash
# Available levels (from highest to lowest priority)
LOG_LEVEL=fatal  # Only fatal errors
LOG_LEVEL=error  # Errors and above
LOG_LEVEL=warn   # Warnings and above
LOG_LEVEL=info   # Info and above (default)
LOG_LEVEL=debug  # Debug messages and above
LOG_LEVEL=trace  # Everything including trace
```

Add to your `.env.local`:

```env
LOG_LEVEL=debug
```

### Usage Examples

#### Basic Logging

```typescript
import logger from "~/lib/logger";

// Info level
logger.info("User logged in successfully");

// Warning
logger.warn("API rate limit approaching");

// Error with context
logger.error({ userId: "123", error: err }, "Failed to fetch user data");

// Debug information
logger.debug({ query: params }, "Database query executed");
```

#### Creating Context Loggers

Create child loggers with persistent context:

```typescript
import { createLogger } from "~/lib/logger";

// Create a logger with specific context
const apiLogger = createLogger({
  module: "api",
  service: "user-service"
});

apiLogger.info("Processing request"); // Will include module and service in every log
```

#### API Route Logging

```typescript
import { NextResponse } from "next/server";
import logger from "~/lib/logger";

export async function GET(request: Request) {
  logger.info("Fetching users list");

  try {
    const users = await fetchUsers();
    logger.debug({ count: users.length }, "Users fetched successfully");
    return NextResponse.json(users);
  } catch (error) {
    logger.error({ error }, "Failed to fetch users");
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

#### Server Actions Logging

```typescript
"use server";

import { createLogger } from "~/lib/logger";

const actionLogger = createLogger({ context: "server-action" });

export async function createUser(formData: FormData) {
  actionLogger.info({ action: "createUser" }, "Creating new user");

  try {
    // Your logic here
    actionLogger.info({ userId: newUser.id }, "User created successfully");
    return { success: true };
  } catch (error) {
    actionLogger.error({ error }, "Failed to create user");
    return { success: false, error: "Failed to create user" };
  }
}
```

### Built-in Logging

The template includes automatic logging in several key areas:

#### 1. Request Logging (`middleware.ts`)

Every HTTP request is automatically logged with:

- **Request ID**: Unique UUID for request tracing
- **HTTP Method**: GET, POST, PUT, DELETE, etc.
- **URL**: Full request URL
- **User Agent**: Client information
- **Response Status**: HTTP status code
- **Duration**: Request processing time in milliseconds

The `X-Request-ID` header is added to all responses for distributed tracing.

**Example log output:**

```json
{
  "level": 30,
  "time": "2025-01-19T10:30:45.123Z",
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "method": "GET",
  "url": "http://localhost:3000/api/users",
  "userAgent": "Mozilla/5.0...",
  "msg": "Incoming request"
}
```

#### 2. Health Check API (`app/api/health/route.ts`)

The health check endpoint includes:

- Info-level logging when endpoint is called
- Debug-level logging with response details
- Error logging if health check fails
- Timestamp in response for monitoring

#### 3. Global Error Handling

**Page-level errors** (`app/error.tsx`):

- Catches errors in specific pages/routes
- Logs error details including message, stack trace, and digest
- Provides user-friendly error UI with retry option

**Application-level errors** (`app/global-error.tsx`):

- Catches critical errors across the entire application
- Logs fatal errors with full context
- Last-resort error boundary for unhandled exceptions

### Production Best Practices

1. **Use Structured Logging**: Always include context objects for better searchability

```typescript
// Good
logger.error({ userId, orderId, error }, "Order processing failed");

// Avoid
logger.error(`Order ${orderId} failed for user ${userId}`);
```

2. **Don't Log Sensitive Data**: Never log passwords, tokens, or PII

```typescript
// Bad
logger.info({ password: user.password }, "User login");

// Good
logger.info({ userId: user.id }, "User login");
```

3. **Use Appropriate Log Levels**:
   - `error` - Failures that need attention
   - `warn` - Issues that don't stop execution
   - `info` - Important business events
   - `debug` - Detailed diagnostic information

4. **Include Error Objects**: Always pass error objects for full stack traces

```typescript
try {
  // code
} catch (error) {
  logger.error({ error }, "Operation failed"); // Captures full stack
}
```

### Log Output Format

Logs are output in structured JSON format, making them easy to parse and search:

```json
{
  "level": 30,
  "time": "2025-01-19T10:30:45.123Z",
  "pid": 12345,
  "hostname": "my-server",
  "msg": "User login successful",
  "userId": "user-123",
  "action": "login"
}
```

**Log Levels (Pino standard):**

- `10` - trace
- `20` - debug
- `30` - info
- `40` - warn
- `50` - error
- `60` - fatal

### Integration with Log Aggregation Services

The structured JSON output is compatible with all major log aggregation and monitoring services:

**Cloud Platforms:**

- **Vercel**: Built-in log streaming and filtering
- **AWS CloudWatch**: Works with Lambda, ECS, and EC2
- **Google Cloud Logging**: Compatible with Cloud Run, GKE, and App Engine
- **Azure Monitor**: Supports structured JSON logs

**Log Management Services:**

- **Datadog**: Direct Node.js integration available
- **New Relic**: Standard JSON log format supported
- **Splunk**: Can ingest and parse Pino JSON logs
- **Sumo Logic**: JSON log parsing built-in

**Open Source:**

- **ELK Stack** (Elasticsearch, Logstash, Kibana): Logstash can parse Pino format
- **Grafana Loki**: Supports JSON log ingestion
- **Graylog**: JSON input supported

### Viewing Logs

**Development:**

```bash
npm run dev
# Logs appear in terminal as structured JSON
```

**Production (Vercel):**

```bash
vercel logs [deployment-url]
# Or view in Vercel Dashboard → Logs
```

**Docker/Self-hosted:**

```bash
# View container logs
docker logs [container-id]

# Stream logs in real-time
docker logs -f [container-id]

# Filter by log level (using jq)
docker logs [container-id] | jq 'select(.level >= 40)'
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
├── .claude/              # Claude Code configuration (agents, skills, hooks)
├── .github/
│   └── workflows/        # GitHub Actions workflows (CI/CD)
├── .storybook/           # Storybook configuration
├── app/                  # Next.js App Router (pages, layouts, API routes)
├── components/           # Reusable React components (stories co-located)
├── constants/            # Static data and configuration constants
├── data/
│   └── env/              # T3 Env type-safe environment variables
├── features/             # Feature-based modules (components, schemas, server)
├── lib/                  # Utility functions and configurations (logger)
├── public/               # Static assets (images, fonts, icons)
├── tests/                # Test files
│   ├── e2e/              # Playwright end-to-end tests
│   ├── integration/      # Storybook integration test setup
│   └── unit/             # Vitest unit tests
├── .env.example          # Example environment variables template
├── eslint.config.mjs     # ESLint configuration
├── next.config.ts        # Next.js configuration
├── playwright.config.ts  # Playwright E2E test configuration
├── prettier.config.js    # Prettier configuration
├── proxy.ts              # Request logging middleware
├── release.config.js     # Semantic Release configuration
├── tsconfig.json         # TypeScript configuration
├── vitest.config.ts      # Vitest test configuration
└── package.json          # Project dependencies and scripts
```

### Key Directories

- **`.claude/`** - Claude Code configuration (agents, skills, hooks, project context)
- **`.github/workflows/`** - CI/CD automation (code review, PR checks, releases)
- **`.storybook/`** - Storybook setup for component development and documentation
- **`app/`** - Next.js 16 App Router with server/client components, layouts, and API routes
- **`components/`** - Shared, reusable UI components with co-located stories
- **`constants/`** - Static data and configuration constants
- **`data/env/`** - T3 Env type-safe environment variable definitions
- **`features/`** - Feature-based modules with related components and logic (modular architecture)
- **`lib/`** - Utility functions, helpers, and third-party library configurations
- **`public/`** - Static files served directly (images, fonts, favicon, etc.)
- **`tests/e2e/`** - End-to-end tests using Playwright for full user flow testing
- **`tests/unit/`** - Unit tests using Vitest

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
