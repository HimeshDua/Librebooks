import {homeContent} from '@/components/library/hero.data';
import Hero from '@/components/library/hero';

export default function HomePage() {
  return <Hero {...homeContent} />;
}
