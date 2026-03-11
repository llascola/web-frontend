import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import { Authorization } from "@/features/auth";

interface InlineEditButtonProps {
    onClick: () => void;
    variant?: "edit" | "create";
}

export const InlineEditButton = ({ onClick, variant = "edit" }: InlineEditButtonProps) => {
    return (
        <Authorization allowedRoles={["ADMIN"]}>
            <Button
                onClick={onClick}
                variant={variant === "create" ? "default" : "outline"}
                size={variant === "create" ? "default" : "sm"}
                className="gap-2"
            >
                {variant === "create" ? (
                    <>
                        <Plus size={16} /> New Post
                    </>
                ) : (
                    <>
                        <Pencil size={16} /> Edit
                    </>
                )}
            </Button>
        </Authorization>
    );
};
