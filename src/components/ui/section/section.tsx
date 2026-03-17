import * as React from "react"
import { cn } from "@/lib/utils"
import { TypographyH1, TypographyH2, TypographyLead } from "../typography/typography"

export type SectionContainerProps = React.HTMLAttributes<HTMLDivElement>;

export const SectionContainer = React.forwardRef<HTMLDivElement, SectionContainerProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 md:pb-24 lg:px-8", className)}
                {...props}
            />
        )
    }
)
SectionContainer.displayName = "SectionContainer"

export interface SectionProps extends React.HTMLAttributes<HTMLElement> { }

export const Section = React.forwardRef<HTMLElement, SectionProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <section
                ref={ref}
                className={cn("", className)}
                {...props}
            >
                {children}
            </section>
        )
    }
)
Section.displayName = "Section"

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    subtitle?: string;
    align?: "left" | "center" | "right";
}

export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
    ({ className, title, description, subtitle, align = "center", children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "flex flex-col gap-8 p-12",
                    align === "center" && "text-center items-center mx-auto max-w-4xl",
                    align === "left" && "text-left items-start pl-32",
                    align === "right" && "text-right items-end pr-32",
                    className
                )}
                {...props}
            >
                <TypographyH1 className="font-bold">
                    {title}
                </TypographyH1>

                {subtitle && (
                    <span className="text-xs font-bold uppercase tracking-tighter text-primary/80 md:text-base">
                        {subtitle}
                    </span>
                )}

                {description && (
                    <TypographyLead className={cn(
                        "max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl",
                        align === "center" && "mx-auto"
                    )}>
                        {description}
                    </TypographyLead>
                )}

                {children && <div className="mt-2 w-full">{children}</div>}
            </div>
        )
    }
)
SectionHeader.displayName = "SectionHeader"