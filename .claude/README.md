# Claude Configuration

This directory contains configuration and documentation for Claude Code agents and skills used in this project.

## Quick Start

**New to this project?** Start here:
1. Read [project-context.md](./project-context.md) - Project-specific tech stack and patterns
2. Review [Available Skills](#skills) - Reusable knowledge modules
3. Explore [Available Agents](#agents) - Specialized AI assistants

## Directory Structure

```
.claude/
├── README.md (this file)
├── project-context.md         # Project-specific configuration
├── settings.json              # Global Claude settings
├── settings.local.json        # Local overrides (gitignored)
├── agents/                    # Specialized agents
│   ├── code-reviewer.md
│   ├── database-architect.md
│   ├── frontend-expert.md
│   ├── library-updater.md
│   ├── nextjs-backend-engineer.md
│   ├── performance-analyzer.md
│   ├── storybook-test-architect.md
│   ├── testing-strategist.md
│   ├── storybook-test-architect/
│   │   └── workflow.md        # 5-phase testing workflow
│   └── examples/              # Example outputs
│       ├── database-queries.example.md
│       └── server-actions.example.md
└── skills/                    # Reusable knowledge
    ├── accessibility-audit/
    ├── api-test/
    ├── builder-factory/
    ├── clerk-auth-proxy/      # [Optional] Clerk auth patterns
    ├── db-migration/          # [Optional] Firebase migrations
    ├── error-handling/        # [Optional] DbError, boundaries
    ├── firebase-firestore/    # [Optional] Firebase patterns
    ├── performance-optimization/
    ├── react-19-compiler/
    ├── server-actions/
    ├── storybook-testing/
    ├── structured-logging/
    ├── t3-env-validation/
    ├── tailwind-css-4/
    └── toast-notifications/   # [Optional] Cookie-based toasts
```

> **[Optional]** = Skill documents patterns for technology not yet installed in the project.

## Skills

Skills are reusable knowledge modules that provide detailed patterns and examples.

### Active Skills (For Installed Technologies)

| Skill | Invoke With | Use When |
|-------|-------------|----------|
| **react-19-compiler** | `/react-19-compiler` | React 19 hooks, React Compiler, memoization decisions |
| **server-actions** | `/server-actions` | Next.js Server Actions, form handling, validation |
| **storybook-testing** | `/storybook-testing` | Writing Storybook stories with interaction tests (CSF Next) |
| **tailwind-css-4** | `/tailwind-css-4` | Tailwind CSS v4 patterns, CSS-first config, design system |
| **t3-env-validation** | `/t3-env-validation` | Type-safe environment variables with Zod validation |
| **structured-logging** | `/structured-logging` | Pino logging patterns, context enrichment, log levels |
| **builder-factory** | `/builder-factory` | Creating test data builders with test-data-bot |
| **api-test** | `/api-test` | Testing Next.js Route Handlers with Playwright |
| **accessibility-audit** | `/accessibility-audit` | WCAG accessibility audits for React components |
| **performance-optimization** | `/performance-optimization` | Bundle analysis, React rendering optimization |

### Optional Skills (Require Additional Installation)

| Skill | Requires | Invoke With |
|-------|----------|-------------|
| **clerk-auth-proxy** | `@clerk/nextjs` | `/clerk-auth-proxy` |
| **firebase-firestore** | `firebase-admin` | `/firebase-firestore` |
| **db-migration** | `firebase-admin` | `/db-migration` |
| **toast-notifications** | Custom setup | `/toast-notifications` |
| **error-handling** | Custom setup | `/error-handling` |

### Skill Documentation Structure

Each skill includes:
- `SKILL.md` - Main documentation and instructions
- `examples.md` - Practical code examples
- `patterns.md` - Best practices (some skills)
- Additional context files as needed

## Agents

Agents are specialized AI assistants for specific development tasks.

| Agent | Model | Use When |
|-------|-------|----------|
| **frontend-expert** | sonnet | Building UI components, Tailwind CSS, design systems |
| **nextjs-backend-engineer** | sonnet | Server actions, route handlers, database operations |
| **database-architect** | sonnet | Data modeling, query optimization, migrations |
| **code-reviewer** | sonnet | Code review for quality, performance, security |
| **testing-strategist** | sonnet | Planning test strategies, analyzing coverage |
| **storybook-test-architect** | sonnet | Creating Storybook interaction tests (CSF Next) |
| **performance-analyzer** | sonnet | Bundle analysis, React optimization, profiling |
| **library-updater** | sonnet | Updating npm packages, handling migrations |

### Agent Metadata

All agents include:
- `version` - Agent version number
- `lastUpdated` - Last modification date
- `related-agents` - Related agents for cross-reference
- `skills` - Skills available to the agent

### Agent-Skill Architecture

Agents orchestrate workflows and use skills for technical knowledge.

**Example: storybook-test-architect**
- **Agent**: `agents/storybook-test-architect.md` - Role, mission, workflow orchestration
  - `agents/storybook-test-architect/workflow.md` - 5-phase testing workflow
- **Skill**: `skills/storybook-testing/` - Complete technical documentation
  - `patterns.md` - CSF Next testing patterns
  - `best-practices.md` - Best practices and pitfalls
  - `examples.md` - Practical code examples
  - `templates.md` - Component test templates
  - `design-system.md` - Testing @szum-tech/design-system
  - `api-reference.md` - Complete API reference

This separation ensures:
- **No duplication** - Technical knowledge lives in skills (single source of truth)
- **Reusability** - Skills can be used by multiple agents
- **Clarity** - Agents focus on workflow, skills focus on implementation

## Configuration Files

### settings.json
Global Claude Code settings including:
- MCP server configuration
- Hooks (SessionStart, PreToolUse, PostToolUse, Stop)
- Auto-formatting with prettier/eslint

### settings.local.json
Local overrides including:
- Permissions (allow/deny lists)
- Environment-specific settings

## Project Context

[project-context.md](./project-context.md) contains essential project information:

- **Tech Stack** - Next.js 16, React 19, Tailwind 4, TypeScript, Pino
- **Testing Stack** - Vitest, Playwright, Storybook 10
- **Patterns**
  - Server Actions (simple success/error pattern)
  - Logging (Pino structured logging)
  - React 19 (useActionState, useFormStatus)
- **Common Pitfalls** - Frequent mistakes and how to avoid them
- **Available Skills** - Quick reference table
- **Optional Integrations** - Clerk, Firebase (documented but not installed)

**Always read this file first when working on any task.**

## Hooks

### SessionStart
Announces session start location.

### PreToolUse (Bash)
Blocks dangerous commands:
- `rm -rf /`
- `git push --force`
- `drop database`

Allows safe force push:
- `git push --force-with-lease`

### PostToolUse (Edit|Write)
Auto-formats code:
1. Runs prettier on all files
2. Runs eslint on TypeScript/JavaScript files
3. Early exit for ignored paths (node_modules, .next, .claude)

### Stop
Verification prompt (60s) before finishing:
- All changes complete?
- No TypeScript errors?
- Follows project patterns?

## Common Commands

```bash
# Development
npm run dev                  # Start dev server
npm run build               # Production build
npm run type-check          # TypeScript check

# Testing
npm run test                # Run all tests
npm run test:unit           # Vitest unit tests
npm run test:storybook      # Storybook component tests
npm run test:e2e            # Playwright E2E tests

# Storybook
npm run storybook:dev       # Start Storybook
npm run test:storybook      # Run Storybook tests

# Code Quality
npm run lint                # Run ESLint
npm run lint:fix            # Auto-fix issues
npm run prettier:write      # Format code
```

## How to Use This Setup

### For Users

**Starting a new feature:**
1. Read `project-context.md` for patterns
2. Invoke relevant skill (e.g., `/server-actions` for backend work)
3. Claude will use skills and agents automatically

**Need specialized help:**
- Ask Claude to use specific agent (e.g., "use code-reviewer to check this")
- Agents are invoked automatically when appropriate

### For Claude Agents

**When starting work:**
1. Read `project-context.md` first
2. Use Context7 for library documentation
3. Follow patterns from skills
4. Use related agents when needed

**When creating tests:**
- Use `storybook-test-architect` agent (orchestrates workflow)
- Technical docs come from `storybook-testing` skill (single source of truth)

**When reviewing code:**
- Use `code-reviewer` agent
- Check against `project-context.md` patterns

## Maintenance

### Updating Documentation

When updating:
1. Update `lastUpdated` field in frontmatter
2. Increment `version` if major changes
3. Update related files in skill/agent directory
4. Test changes with actual usage

### Adding New Skills

1. Create directory: `.claude/skills/[skill-name]/`
2. Add `SKILL.md` with frontmatter (name, version, lastUpdated, description)
3. Add `examples.md` with practical code examples
4. Optionally add `patterns.md`, `api-reference.md`
5. Update `project-context.md` skills table
6. Update this README

### Adding New Agents

1. Create `.claude/agents/[agent-name].md`
2. Include frontmatter (name, version, lastUpdated, description, tools, model, skills)
3. Define clear mission and workflow
4. Add related-agents field
5. Update this README

## Statistics

**Current Setup:**
- **8 agents** (specialized AI assistants)
- **15 skills** (10 active + 5 optional)
- **4 MCP servers** (next-devtools, playwright, context7, jetbrains)

---

**Need help?** Start with [project-context.md](./project-context.md) and explore relevant skills for your task.
