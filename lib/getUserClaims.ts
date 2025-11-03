"use client"

import { SupabaseClient, User } from "@supabase/supabase-js";
import { toast } from "sonner";

export async function getUserClaims(supabase: SupabaseClient):
    Promise<{ user: User | null }> {
    const pathName = typeof window !== 'undefined' ? window.location.pathname : '';
    const { data, error } = await supabase.auth.getUser();
    const user = data.user;
    if (error) {
        setTimeout(() => {
            toast.error(`Failed to fetch user information.`, {
                description: error.message,
                action: {
                    label: 'Log in',
                    actionButtonStyle: {
                        padding: '0.25rem 0.75rem',
                    },
                    onClick: () => {
                        window.location.href = '/auth/login';
                    },
                },
            });
        }, 300);
    }
    return { user }
}
