import React, {createContext, ReactNode, useContext, useEffect, useMemo, useState} from 'react';
import {createClient} from '@/lib/supabase/client';
import {User} from '@supabase/supabase-js';

const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  favoriteCount: number;
  setFavoriteCount: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

export const UserProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [favoriteCount, setFavoriteCount] = useState<number>(0);

  const supabase = useMemo(() => createClient(), []);

  async function fetchFavorites() {
    if (!user?.id) return;
    const {data, error} = await supabase.from('favorites').select('id').eq('user_id', user.id);
    if (error) {
      console.error('Error fetching favorites:', error.message);
      return;
    }
    setFavoriteCount(data?.length || 0);
  }

  useEffect(() => {
    const getUser = async () => {
      const {data} = await supabase.auth.getUser();
      setUser(data?.user ?? null);
    };
    getUser();

    const {data: listener} = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    fetchFavorites();

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (user) fetchFavorites();
  }, [user]);

  return (
    <UserContext.Provider value={{user, setUser, favoriteCount, setFavoriteCount}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
