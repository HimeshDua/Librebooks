import Link from 'next/link';
import {Button} from '../ui/button';
import {Star} from 'lucide-react';
import {Avatar, AvatarImage} from '../ui/avatar';
import Image from 'next/image';
import dynamic from 'next/dynamic';

export interface HeroProps {
  heading?: string;
  description?: string;
  primaryAction?: {
    text: string;
    url: string;
  };
  secondaryAction?: {
    text: string;
    url: string;
  };
  reviews: {
    count: number;
    rating: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  };
}

const ThreeCanvas = dynamic(() => import('@/components/canvas/threecanvas'), {ssr: true});
function Hero({heading, description, primaryAction, secondaryAction, reviews}: HeroProps) {
  return (
    <section className="relative py-16 sm:py-20 lg:py-32">
      <div className="container mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        {/* Left content */}
        <div className="flex flex-col gap-6 text-center md:text-left">
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            {heading}
          </h1>

          <p className="mx-auto max-w-xl text-sm text-muted-foreground sm:text-base md:mx-0 md:text-lg">
            {description}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
            <Button asChild size="lg">
              <Link href={primaryAction?.url || '/library'}>
                {primaryAction?.text || 'Explore Library'}
              </Link>
            </Button>

            {secondaryAction && (
              <Button asChild size="lg" variant="outline">
                <Link href={secondaryAction.url}>{secondaryAction.text}</Link>
              </Button>
            )}
          </div>

          {/* Trust */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-6 md:items-start">
            <div className="flex -space-x-3">
              {reviews.avatars.map((avatar, index) => (
                <Avatar key={index} className="size-10 sm:size-12 border shadow-sm">
                  <AvatarImage src={avatar.src} alt={avatar.alt} />
                </Avatar>
              ))}
            </div>

            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 font-semibold">{reviews.rating.toFixed(1)}</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Trusted by {reviews.count}+ readers worldwide
              </p>
            </div>
          </div>
        </div>

        {/* Right visual */}
        <div className="relative mx-auto aspect-square w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md">
          {/* <div className="h-full w-full rounded-2xl border bg-muted/40 shadow-lg"> */}
          <div className="h-full w-full ">
            <ThreeCanvas />
            {/* <Image fill alt="d" className="object-cover" src={'/default-book-cover.jpg'} /> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
