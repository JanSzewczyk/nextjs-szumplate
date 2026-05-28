# UI — @szum-tech/design-system

This project uses `@szum-tech/design-system`. Always use semantic tokens and components from this package instead of raw Tailwind values.

## Colors — semantic tokens instead of raw Tailwind classes

| ❌ Do not use | ✅ Use instead |
|---|---|
| `text-blue-500`, `text-blue-600` | `text-primary` |
| `bg-blue-600`, `bg-blue-500` | `bg-primary` |
| `text-gray-500`, `text-gray-400` | `text-muted-foreground` |
| `bg-gray-100`, `bg-gray-50` | `bg-muted` or `bg-muted/30` |
| `text-gray-900`, `text-gray-800` | `text-foreground` |
| `bg-white` | `bg-background` or `bg-card` |
| `border-gray-200`, `border-gray-300` | `border-border` |
| `text-green-600` | `text-success` |
| `text-red-600` | `text-error` |
| `text-yellow-600` | `text-warning` |
| `hover:bg-gray-100` | `hover:bg-accent` |
| `focus:ring-blue-500` | `focus-visible:ring-ring` |

Opacity variants of tokens are allowed: `bg-primary/10`, `bg-muted/30`, `text-foreground/60`.

## Typography — DS classes (mandatory)

**Display** (hero, large section headings):
- `text-display-xl` (3→4.5rem, extrabold) — main hero
- `text-display-lg` (2.5→3.75rem, extrabold) — large hero
- `text-display-md` (2→3rem, bold) — section hero
- `text-display-sm` (1.75→2.25rem, bold) — sub-hero, large numbers

**Headings**:
- `text-heading-h1` (1.75→2rem, bold)
- `text-heading-h2` (1.375→1.5rem, semibold)
- `text-heading-h3` (1.125→1.25rem, semibold)
- `text-heading-h4` (1rem→1.125rem, semibold)

**Body**:
- `text-body-xl` (20px) / `text-body-lg` (18px) / `text-body-default` (16px)
- `text-body-sm` (14px) / `text-body-xs` (12px)

**Special**:
- `text-lead` — intro paragraph (body-xl, muted-foreground, lh 1.7)
- `text-mute` — secondary/helper (body-sm, muted-foreground)
- `text-small` — fine print (body-xs, muted-foreground)
- `text-code` — inline code (JetBrains Mono, bg-muted, rounded)
- `text-blockquote` — blockquote (left border, muted-foreground)

**Forbidden as the sole text class**: `text-xl`, `text-2xl`, `text-3xl`, `text-sm`, `text-xs`, `text-lg`, `font-bold`, `font-medium` — replace with DS classes. Supplementary `font-semibold` and `font-poppins` are OK.

## DS components — full list with imports

```typescript
// Buttons
import { Button } from "@szum-tech/design-system/components/button";
// variants: default | error | outline | secondary | ghost | link
// sizes: sm | default | lg | icon-sm | icon | icon-lg | fullWidth
// props: startIcon, endIcon, loading, loadingPosition, asChild

// Cards
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction }
  from "@szum-tech/design-system/components/card";

// Badges
import { Badge } from "@szum-tech/design-system/components/badge";
// variants: primary | secondary | outline | success | warning | error
import { BadgeOverflow } from "@szum-tech/design-system/components/badge-overflow";
import { BadgeDot } from "@szum-tech/design-system/components/badge-dot";
import { BadgeButton } from "@szum-tech/design-system/components/badge-button";

// Forms
import { Input } from "@szum-tech/design-system/components/input";
import { Textarea } from "@szum-tech/design-system/components/textarea";
import { Checkbox } from "@szum-tech/design-system/components/checkbox";
import { RadioGroup } from "@szum-tech/design-system/components/radio-group";
import { Select } from "@szum-tech/design-system/components/select";
import { Label } from "@szum-tech/design-system/components/label";
import { Field } from "@szum-tech/design-system/components/field";
import { FieldGroup } from "@szum-tech/design-system/components/field-group";
import { FieldSet } from "@szum-tech/design-system/components/field-set";

// Feedback & status
import { Alert, AlertTitle, AlertDescription } from "@szum-tech/design-system/components/alert";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription,
  AlertDialogAction, AlertDialogCancel }
  from "@szum-tech/design-system/components/alert-dialog";
import { Status, StatusIndicator, StatusLabel } from "@szum-tech/design-system/components/status";
import { Spinner } from "@szum-tech/design-system/components/spinner";
import { Toaster } from "@szum-tech/design-system/components/toaster";
import { Progress } from "@szum-tech/design-system/components/progress";

// Layout & containers
import { Separator } from "@szum-tech/design-system/components/separator";
import { ScrollArea } from "@szum-tech/design-system/components/scroll-area";
import { Header } from "@szum-tech/design-system/components/header";
import { Masonry } from "@szum-tech/design-system/components/masonry";

// Navigation
import { Tabs, TabsList, TabsTrigger, TabsContent }
  from "@szum-tech/design-system/components/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
  from "@szum-tech/design-system/components/accordion";
import { Stepper, StepperNav, StepperPanel }
  from "@szum-tech/design-system/components/stepper";

// Overlays
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter,
  DialogTitle, DialogDescription }
  from "@szum-tech/design-system/components/dialog";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter,
  SheetTitle, SheetDescription }
  from "@szum-tech/design-system/components/sheet";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent }
  from "@szum-tech/design-system/components/tooltip";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator }
  from "@szum-tech/design-system/components/dropdown-menu";

// Content display
import { Avatar, AvatarImage, AvatarFallback }
  from "@szum-tech/design-system/components/avatar";
import { Item, ItemMedia, ItemContent, ItemHeader, ItemTitle, ItemDescription,
  ItemActions, ItemFooter }
  from "@szum-tech/design-system/components/item";
import { ItemGroup, ItemSeparator } from "@szum-tech/design-system/components/item-group";
import { Timeline, TimelineItem, TimelineDot, TimelineConnector, TimelineContent }
  from "@szum-tech/design-system/components/timeline";
import { Empty, EmptyMedia, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent }
  from "@szum-tech/design-system/components/empty";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }
  from "@szum-tech/design-system/components/carousel";
import { ColorSwatch } from "@szum-tech/design-system/components/color-swatch";
import { Marquee } from "@szum-tech/design-system/components/marquee";

// Animated text
import { TypingText } from "@szum-tech/design-system/components/typing-text";
import { WordRotate } from "@szum-tech/design-system/components/word-rotate";
import { CountingNumber } from "@szum-tech/design-system/components/counting-number";

// DS icons
import { GoogleLogoIcon, Auth0LogoIcon, XLogoIcon } from "@szum-tech/design-system/icons";

// Utilities
import { cn } from "@szum-tech/design-system/utils";
import { useComposedRefs } from "@szum-tech/design-system/hooks";
```

Never import directly from `@radix-ui/*` — always use the DS wrapper.

## cn() — class merging

```typescript
import { cn } from "@szum-tech/design-system/utils";
className={cn("base-classes", conditional && "extra-class", className)}
```

Always use `cn()` when merging classes conditionally or when a component accepts a `className` prop.
