import Link from 'next/link';
import {Button} from '../ui/button';
import {Star} from 'lucide-react';
import {Avatar, AvatarImage} from '../ui/avatar';

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

function Hero({heading, description, primaryAction, secondaryAction, reviews}: HeroProps) {
  return (
    <section className="relative py-32">
      <div className="container mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        {/* Left content */}
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <h1 className="text-4xl font-bold leading-tight tracking-tight lg:text-6xl">{heading}</h1>

          <p className="max-w-xl text-muted-foreground lg:text-lg">{description}</p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
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
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
            <div className="flex -space-x-3">
              {reviews.avatars.map((avatar, index) => (
                <Avatar key={index} className="size-12 border shadow-sm">
                  <AvatarImage src={avatar.src} alt={avatar.alt} />
                </Avatar>
              ))}
            </div>

            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 font-semibold">{reviews.rating.toFixed(1)}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Trusted by {reviews.count}+ readers worldwide
              </p>
            </div>
          </div>
        </div>

        {/* Right visual placeholder */}
        <div className="hidden lg:block">
          <div className="relative mx-auto aspect-square max-w-md rounded-2xl border bg-muted/40 shadow-lg" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
