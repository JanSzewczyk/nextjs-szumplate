export interface QuickStartStep {
  command: string;
  description: string;
  step: number;
  title: string;
}

export const QUICK_START_STEPS: Array<QuickStartStep> = [
  {
    command: "gh repo create my-app --template JanSzewczyk/nextjs-szumplate",
    description: "Create a new repository from this template",
    step: 1,
    title: "Use Template"
  },
  {
    command: "npm install",
    description: "Install all required packages",
    step: 2,
    title: "Install Dependencies"
  },
  {
    command: "npm run dev",
    description: "Launch the development server",
    step: 3,
    title: "Start Development"
  }
];
