import {homeContent} from '@/components/essentials/hero.data';
import Hero from '@/components/essentials/hero';

export default function HomePage() {
  return <Hero {...homeContent} />;
}
