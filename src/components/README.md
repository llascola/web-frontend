# Components Architecture & Best Practices

This directory contains the core React components for the portfolio application. To ensure scalability, consistency, and a clean codebase, we follow strict decoupling, composition, and semantic styling guidelines.

## Directory Structure

We enforce a strict separation between **Feature/Layout Components** and **UI Primitives**:

- **`/src/components/ui/`**: Contains low-level, reusable UI primitives (Buttons, Inputs, Cards, Containers). 
- **`/src/components/`**: Contains high-level feature sections (Hero, About, BlogSection) constructed by composing the UI primitives.

## 1. Modularity and Composition

Components should be built to be as reusable as possible. Instead of duplicating layout logic across different sections, we extract common patterns into reusable containers.

**Example: Page Widths and Typography**
Instead of manually adding `max-w-7xl mx-auto px-4` to every section, use the `<Container />` primitive. Instead of repeating identical title markup, use the `<SectionHeader />` component.

```tsx
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

export const FeatureSection = () => (
  <section className="py-20 bg-background">
      <Container>
          <SectionHeader title="My Feature" description="Details about this feature." />
          {/* Content goes here */}
      </Container>
  </section>
);
```

## 2. Styling Rules: The `cn()` Utility

We use `tailwind-merge` and `clsx` (combined in our `cn()` utility in `src/lib/utils.ts`) to merge CSS classes safely without Tailwind conflicts.

**Rule:** Always accept a `className` prop in reusable UI components and merge it with the default styles using `cn()`.

```tsx
// ❌ BAD: Overrides are hard/impossible because Tailwind classes will conflict
export const Card = ({ className, children }) => (
  <div className={`rounded-xl border bg-card text-card-foreground shadow ${className}`}>
    {children}
  </div>
);

// ✅ GOOD: cn() securely merges and overrides conflicting classes
import { cn } from "@/lib/utils";

export const Card = ({ className, children }) => (
  <div className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}>
    {children}
  </div>
);
```

## 3. Semantic Theme Colors (Dark-Mode Ready)

Hardcoded Tailwind colors (e.g., `text-blue-600` or `bg-slate-50`) make scaling and theming incredibly difficult. All components must use **semantic colors** defined in `src/index.css`. This ensures that if a `.dark` class is applied to the document, the entire site dynamically switches themes without any component code changes.

- **Backgrounds:** use `bg-background`, `bg-muted`, `bg-secondary`, or `bg-card`. *(Do not use `bg-white` or `bg-slate-50`)*.
- **Text:** use `text-foreground` for primary text and `text-muted-foreground` for secondary text. *(Do not use `text-slate-900` or `text-slate-500`)*.
- **Accents:** use `bg-primary` or `text-primary`. *(Do not use `bg-blue-600`)*.
- **Borders:** use `border-border`.

```tsx
// ❌ BAD: Hardcoded colors fail in Dark Mode
<div className="bg-slate-50 border border-slate-200">
    <h3 className="text-slate-900">Title</h3>
    <p className="text-slate-600">Subtitle</p>
    <button className="bg-blue-600 text-white">Click Me</button>
</div>

// ✅ GOOD: Semantic tokens automatically adjust to the root theme
<div className="bg-muted border border-border">
    <h3 className="text-foreground">Title</h3>
    <p className="text-muted-foreground">Subtitle</p>
    <button className="bg-primary text-primary-foreground">Click Me</button>
</div>
```

## 4. UI Primitives: No Internal Layout Positioning

Primitive components inside `/ui/` (like Buttons, Inputs, Labels) must **never** contain external layout spacing (e.g., margins like `mt-4` or absolute positioning like `top-0 left-4`). 

Primitives define how an element *looks*. Their parent feature component defines *where* they are placed.

## 5. Use `class-variance-authority` (cva) for Component Variants

When building UI components that have different visual states (e.g., a Button that can be `solid`, `outline`, or `ghost`, and `small` or `large`), avoid chaining multiple nested ternaries. Use `cva` to define clear, type-safe variants. (See `src/components/ui/button.tsx` for an example).

## 6. Standardized Typography

To guarantee exact line-heights, margins, and font scaling across the entire project, avoid hardcoding text utility classes on native HTML tags (e.g., `<h1 className="text-4xl font-bold">`). 

Instead, use the semantic wrappers from the `src/components/ui/typography.tsx` suite:
- **Heading Levels:** `TypographyH1`, `TypographyH2`, `TypographyH3`
- **Body Text:** `TypographyP`, `TypographyLead`, `TypographyMuted`, `TypographySmall`

## 7. Performance & React Anti-Patterns

To ensure a highly performant and accessible UI, adhere to the following React rules:

### Static Configurations
Never instantiate constant arrays (like navigation links or feature card data) inside the component's render function. This causes React to allocate duplicate memory on every re-render. Always extract constant data *outside* of the component.

### React Keys in Lists
Never use the loop `index` as a `key` prop in `.map()` unless the list is guaranteed perfectly static. Always map over unique, permanent identifiers (e.g., `key={project.title}`).

### Semantic Links and Accessibility (A11y)
Do not use raw `<Button onClick={...}>` components acting as pseudo-links for routing. This breaks SEO and prevents users from middle-clicking or opening in new tabs. 
Instead, use the `asChild` pattern from Radix to wrap actual `<a>` tags or React Router `<Link>` tags:

```tsx
// ✅ GOOD: A semantically perfect link that looks exactly like a Button
import { Button } from "@/components/ui/button";

<Button asChild variant="outline">
    <a href="/about">Read More</a>
</Button>
```
