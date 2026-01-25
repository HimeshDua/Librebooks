import Link from 'next/link';
import {Button} from '../ui/button';
import {Avatar, AvatarImage} from '../ui/avatar';
import {FlipWords} from '../ui/flip-words';
import {PointerHighlight} from '../ui/pointer-highlight';
import {Spotlight} from '../ui/spotlight';
import {BookOpen, SparklesIcon, Star, Zap} from '@hugeicons/core-free-icons';
import {HugeiconsIcon} from '@hugeicons/react';

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

const words = ['immersive', 'effortless', 'limitless', 'secure', 'lightning-fast', 'curated'];

async function Hero({heading: _, description, primaryAction, secondaryAction, reviews}: HeroProps) {
  return (
    <section className="relative min-h-[50vh] py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Improved Spotlight for dark mode */}
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="oklch(0.82 0.11 346)" />

      <div className="container mx-auto grid max-w-6xl gap-10 lg:gap-12 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            A{' '}
            <PointerHighlight
              // Improved contrast for dark mode
              rectangleClassName="
                bg-linear-to-r from-pink-100 to-blue-100
                border-pink-200
                dark:from-pink-900/40 dark:to-blue-900/40
                dark:border-pink-700/50
                leading-loose backdrop-blur-md
                shadow-sm dark:shadow-black/20
                text-foreground
              "
              // Brighter pointer for dark mode
              pointerClassName="
                text-amber-500 h-3 w-3
                dark:text-amber-400
              "
              containerClassName="inline-block mr-1"
            >
              <FlipWords words={words} />
            </PointerHighlight>
            way to discover and read free books
          </h1>

          <p className="mx-auto lg:mx-0 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-lg">
            {description ||
              'Access thousands of free books with our beautifully designed platform. Read anywhere, anytime, completely free.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
            <Button
              size="lg"
              variant="default"
              nativeButton={false}
              className="
                w-full sm:w-auto
                bg-linear-to-r from-pink-500 to-rose-500
                hover:from-pink-600 hover:to-rose-600
                dark:from-pink-600 dark:to-rose-600
                dark:hover:from-pink-700 dark:hover:to-rose-700
                transition-colors duration-150
                text-white
              "
              render={
                <Link href={primaryAction?.url || '/library'}>
                  <span className="flex items-center gap-2">
                    <HugeiconsIcon icon={BookOpen} size={32} className="size-5" />
                    {primaryAction?.text || 'Explore Library'}
                  </span>
                </Link>
              }
            />

            {secondaryAction && (
              <Button
                size="lg"
                variant="outline"
                className="
                  w-full sm:w-auto
                  border-pink-200 dark:border-pink-600
                  text-pink-600 dark:text-pink-400
                  hover:bg-pink-50 dark:hover:bg-pink-950/30
                  hover:text-pink-700 dark:hover:text-pink-300
                "
                render={
                  <Link href={secondaryAction.url} className="flex items-center gap-2">
                    <HugeiconsIcon icon={Zap} className="size-5" />
                    {secondaryAction.text}
                  </Link>
                }
              />
            )}
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col justify-normal items-center gap-4 sm:flex-row sm:gap-6 lg:items-start mx-auto lg:me-auto lg:ms-0">
            <div className="flex -space-x-3">
              {reviews.avatars.map((avatar, index) => (
                <Avatar
                  key={index}
                  className="
                    size-10 sm:size-12
                    border-2 border-white dark:border-gray-800
                    shadow-sm dark:shadow-black/20
                  "
                >
                  <AvatarImage src={avatar.src} alt={avatar.alt} />
                </Avatar>
              ))}
            </div>

            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1">
                {[...Array(5)].map((_, i) => (
                  <HugeiconsIcon
                    key={i}
                    icon={Star}
                    className="size-4 sm:size-5 fill-amber-300 text-amber-300 dark:fill-amber-400 dark:text-amber-400"
                  />
                ))}
                <span className="ml-2 font-semibold text-sm sm:text-base dark:text-gray-200">
                  {reviews.rating.toFixed(1)}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Trusted by {reviews.count}+ readers worldwide
              </p>
            </div>
          </div>
        </div>

        {/* Pastel Book Stack - Improved for dark mode */}
        <div className="relative order-first lg:order-last">
          <div className="relative mx-auto max-w-md lg:max-w-lg">
            {/* Main Book Stack */}
            <div className="relative">
              {/* Book 1 - Front (Pastel Coral) */}
              <div
                className="
                absolute -top-8 -right-4 w-48 h-64
                bg-linear-to-br from-pink-300 via-rose-200 to-pink-200
                dark:from-pink-800/60 dark:via-rose-800/40 dark:to-pink-800/50
                rounded-lg shadow-2xl shadow-pink-200/50
                dark:shadow-pink-900/30
                transform rotate-6 animate-float
              "
              >
                <div className="absolute inset-4 bg-linear-to-b from-pink-100/40 to-transparent dark:from-pink-900/30 dark:to-transparent rounded" />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-1 bg-white/50 dark:bg-white/20 h-32 rounded-full" />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1 bg-white/40 dark:bg-white/15 h-24 rounded-full" />
              </div>

              {/* Book 2 - Middle (Pastel Mint) */}
              <div
                className="
                absolute top-4 right-8 w-52 h-72
                bg-linear-to-br from-teal-200 via-emerald-100 to-cyan-100
                dark:from-teal-800/50 dark:via-emerald-800/40 dark:to-cyan-800/40
                rounded-lg shadow-xl shadow-teal-200/40
                dark:shadow-teal-900/30
                transform -rotate-3 animate-float-delayed
              "
              >
                <div className="absolute inset-4 bg-linear-to-b from-emerald-50/30 to-transparent dark:from-emerald-900/20 dark:to-transparent rounded" />
                <div className="absolute left-6 top-1/2 -translate-y-1/2 w-1 bg-white/60 dark:bg-white/25 h-36 rounded-full" />
              </div>

              {/* Book 3 - Back (Pastel Sky Blue) */}
              <div
                className="
                relative w-56 h-80
                bg-linear-to-br from-sky-100 via-blue-50 to-indigo-50
                dark:from-sky-900/40 dark:via-blue-900/30 dark:to-indigo-900/30
                rounded-lg shadow-2xl shadow-blue-200/30
                dark:shadow-blue-900/30
                overflow-hidden
              "
              >
                {/* Book cover design */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-200/40 to-indigo-100/30 dark:from-blue-800/30 dark:to-indigo-800/20" />
                <div className="absolute left-6 top-8 right-6 bottom-8 bg-linear-to-b from-white/30 to-white/10 dark:from-white/10 dark:to-white/5 rounded" />

                {/* Title */}
                <div className="absolute left-8 right-8 top-12 space-y-2">
                  <div className="h-3 bg-white/40 dark:bg-white/20 rounded-full" />
                  <div className="h-3 bg-white/30 dark:bg-white/15 rounded-full w-3/4" />
                </div>

                {/* Author */}
                <div className="absolute left-8 bottom-16">
                  <div className="h-2 w-20 bg-white/30 dark:bg-white/15 rounded-full" />
                </div>

                {/* Pages effect */}
                <div className="absolute right-0 top-0 bottom-0 w-12">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute right-0 w-12 h-px bg-white/20 dark:bg-white/10"
                      style={{top: `${i * 5}%`}}
                    />
                  ))}
                </div>

                {/* Decorative glows - adjusted for dark mode */}
                <div className="absolute -bottom-4 -left-4 size-24 bg-linear-to-r from-pink-200/30 to-rose-200/20 dark:from-pink-900/20 dark:to-rose-900/15 rounded-full blur-xl" />
                <div className="absolute -top-4 -right-4 size-20 bg-linear-to-r from-teal-200/20 to-emerald-200/20 dark:from-teal-900/15 dark:to-emerald-900/15 rounded-full blur-xl" />
              </div>

              {/* Floating Elements - Improved for dark mode */}

              {/* Coral Sparkle */}
              <div
                className="
                absolute -top-12 -left-8 size-16
                bg-linear-to-r from-pink-400 to-rose-400
                dark:from-pink-600 dark:to-rose-600
                rounded-full flex items-center justify-center
                shadow-lg shadow-pink-400/40
                dark:shadow-pink-600/40
                animate-bounce-slow
              "
              >
                <HugeiconsIcon
                  icon={SparklesIcon}
                  className="size-8 text-secondary dark:text-secondary"
                />
              </div>

              {/* Mint Book */}
              <div
                className="
                absolute -bottom-8 -right-8 size-20
                bg-linear-to-r from-teal-400 to-emerald-400
                dark:from-teal-600 dark:to-emerald-600
                rounded-full flex items-center justify-center
                shadow-lg shadow-teal-400/40
                dark:shadow-teal-600/40
                animate-bounce-slow-delayed
              "
              >
                <HugeiconsIcon
                  icon={BookOpen}
                  className="size-10 text-secondary dark:text-secondary"
                />
              </div>

              {/* Sunflower Zap */}
              <div
                className="
                absolute top-1/2 -left-12 size-12
                bg-linear-to-r from-amber-400 to-yellow-400
                dark:from-amber-500 dark:to-yellow-500
                rounded-full flex items-center justify-center
                shadow-lg shadow-amber-400/40
                dark:shadow-amber-500/40
                animate-ping-slow
              "
              >
                <HugeiconsIcon icon={Zap} className="size-6 text-secondary dark:text-secondary" />
              </div>

              {/* Sky Blue Star */}
              <div
                className="
                absolute -top-4 right-0 size-10
                bg-linear-to-r from-sky-400 to-cyan-400
                dark:from-sky-500 dark:to-cyan-500
                rounded-full flex items-center justify-center
                shadow-lg shadow-sky-400/40
                dark:shadow-sky-500/40
                animate-spin-slow
              "
              >
                <HugeiconsIcon icon={Star} className="size-5 text-secondary dark:text-secondary" />
              </div>
            </div>
          </div>

          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]">
            <div
              className="
              absolute inset-0
              bg-linear-to-r from-pink-100/20 via-teal-100/15 to-blue-100/20
              dark:from-pink-900/10 dark:via-teal-900/5 dark:to-blue-900/10
              rounded-[3rem] blur-3xl
            "
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
