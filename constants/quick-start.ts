export interface QuickStartStep {
  step: number;
  title: string;
  description: string;
  command: string;
}

export const QUICK_START_STEPS: QuickStartStep[] = [
  {
    step: 1,
    title: "Use Template",
    description: "Create a new repository from this template",
    command: "gh repo create my-app --template JanSzewczyk/nextjs-szumplate"
  },
  {
    step: 2,
    title: "Install Dependencies",
    description: "Install all required packages",
    command: "npm install"
  },
  {
    step: 3,
    title: "Start Development",
    description: "Launch the development server",
    command: "npm run dev"
  }
];
