import * as React from "react"
import { cn } from "@/lib/utils"
import { TypographyH2, TypographyLarge } from "./typography"

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
}

export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
    ({ className, title, description, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("text-center mb-16", className)}
                {...props}
            >
                <TypographyH2 className="md:text-4xl mb-4">{title}</TypographyH2>
                <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
                {description && (
                    <TypographyLarge className="mt-4 text-muted-foreground font-normal max-w-2xl mx-auto">
                        {description}
                    </TypographyLarge>
                )}
            </div>
        )
    }
)
SectionHeader.displayName = "SectionHeader"
