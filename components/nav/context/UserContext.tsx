import { getUserClaims } from "@/lib/getUserClaims";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const supabase = createClient()

    useEffect(() => {
        async function loadUser() {
            const { user } = await getUserClaims(supabase)
            setUser(user || null);
        }

        loadUser()

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => listener.subscription.unsubscribe();

    }, [])

    return { children }
}

export const useUser = () => useContext(UserContext);