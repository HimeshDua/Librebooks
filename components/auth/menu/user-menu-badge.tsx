import type {User} from '@supabase/supabase-js';
import {FavoriteCountBadge} from './favorite-count-badge';
import {UserMenu} from './user-menu';

type Props = {
  user: User;
  favoriteCount: number;
  isMobile: boolean;
};

export function UserMenuWithBadge({user, favoriteCount, isMobile}: Props) {
  return (
    <div className="relative">
      <UserMenu user={user} favoriteCount={favoriteCount} isMobile={isMobile} />
      <FavoriteCountBadge count={favoriteCount} />
    </div>
  );
}
