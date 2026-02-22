import React from "react";
import { cn } from "@/lib/utils";

type TypographyProps = React.HTMLAttributes<HTMLElement>;

export const TypographyH1 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
    ({ className, ...props }, ref) => (
        <h1
            ref={ref}
            className={cn(
                "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground",
                className
            )}
            {...props}
        />
    )
);
TypographyH1.displayName = "TypographyH1";

export const TypographyH2 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
    ({ className, ...props }, ref) => (
        <h2
            ref={ref}
            className={cn(
                "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 text-foreground",
                className
            )}
            {...props}
        />
    )
);
TypographyH2.displayName = "TypographyH2";

export const TypographyH3 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
    ({ className, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn(
                "scroll-m-20 text-2xl font-semibold tracking-tight text-foreground",
                className
            )}
            {...props}
        />
    )
);
TypographyH3.displayName = "TypographyH3";

export const TypographyP = React.forwardRef<HTMLParagraphElement, TypographyProps>(
    ({ className, ...props }, ref) => (
        <p
            ref={ref}
            className={cn("leading-7 [&:not(:first-child)]:mt-6 text-foreground", className)}
            {...props}
        />
    )
);
TypographyP.displayName = "TypographyP";

export const TypographyLead = React.forwardRef<HTMLParagraphElement, TypographyProps>(
    ({ className, ...props }, ref) => (
        <p
            ref={ref}
            className={cn("text-xl text-muted-foreground", className)}
            {...props}
        />
    )
);
TypographyLead.displayName = "TypographyLead";

export const TypographyLarge = React.forwardRef<HTMLDivElement, TypographyProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("text-lg font-semibold text-foreground", className)}
            {...props}
        />
    )
);
TypographyLarge.displayName = "TypographyLarge";

export const TypographySmall = React.forwardRef<HTMLElement, TypographyProps>(
    ({ className, ...props }, ref) => (
        <small
            ref={ref}
            className={cn("text-sm font-medium leading-none text-foreground", className)}
            {...props}
        />
    )
);
TypographySmall.displayName = "TypographySmall";

export const TypographyMuted = React.forwardRef<HTMLParagraphElement, TypographyProps>(
    ({ className, ...props }, ref) => (
        <p
            ref={ref}
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        />
    )
);
TypographyMuted.displayName = "TypographyMuted";
