'use server';
import React from 'react';
import {Button} from '../ui/button';
import Link from 'next/link';
import {Star} from 'lucide-react';
import {Avatar, AvatarImage} from '../ui/avatar';

export interface HeroProps {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
  reviews: {
    count: number;
    rating?: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  };
}

async function Hero({heading, description, button, reviews}: HeroProps) {
  return (
    <section className="py-32 mx-auto">
      <div className="container mx-auto text-center">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <h1 className="text-3xl text-balance font-semibold lg:text-6xl">{heading}</h1>
          <p className="text-muted-foreground text-balance lg:text-lg">{description}</p>
        </div>

        <Button asChild size="lg" className="mt-10">
          <Link prefetch={true} href={button?.url || '/library'}>
            {button?.text}
          </Link>
        </Button>

        <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">
          <span className="mx-4 inline-flex items-center -space-x-4">
            {reviews.avatars.map((avatar, index) => (
              <Avatar key={index} className="size-14 border">
                <AvatarImage src={avatar.src} alt={avatar.alt} />
              </Avatar>
            ))}
          </span>

          <div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star key={index} className="size-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="mr-1 font-semibold">{reviews.rating?.toFixed(1)}</span>
            </div>
            <p className="text-muted-foreground text-left font-medium">
              from {reviews.count}+ reviews
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
