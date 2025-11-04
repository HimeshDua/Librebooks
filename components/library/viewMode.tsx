'use client';

import { cn } from "@/lib/utils";
import { Grid3X3, List } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function ViewModeToggle({className}:{className?: string}) {
    const searchParams = useSearchParams();
    const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

    useEffect(() => {
        const savedViewMode = getCookie('viewMode');
        if (savedViewMode === 'grid' || savedViewMode === 'compact') {
            setViewMode(savedViewMode);
        }
    }, []);

    const saveViewMode = (mode: 'grid' | 'compact') => {
        setViewMode(mode);
        document.cookie = `viewMode=${mode}; path=/; max-age=31536000`;
    };

    const getCookie = (name: string): string | null => {
        if (typeof document === 'undefined') return null;

        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
        return null;
    };

    const createUrl = (view: 'grid' | 'compact') => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('view', view);
        return `?${params.toString()}`;
    };

    return (
        <div className={cn(
            className,
            "flex items-center border border-border rounded-lg p-1 bg-background")}>
            <Link
                href={createUrl('grid')}
                onClick={() => saveViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
                title="Grid view"
            >
                <Grid3X3 className="w-4 h-4" />
            </Link>
            <Link
                href={createUrl('compact')}
                onClick={() => saveViewMode('compact')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'compact'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
                title="Compact view"
            >
                <List className="w-4 h-4" />
            </Link>
        </div>
    );
}