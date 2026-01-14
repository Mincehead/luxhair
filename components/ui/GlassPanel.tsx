import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassPanelProps {
    children: ReactNode;
    className?: string;
}

export function GlassPanel({ children, className }: GlassPanelProps) {
    return (
        <div className={cn("glass-panel rounded-2xl p-6", className)}>
            {children}
        </div>
    );
}
