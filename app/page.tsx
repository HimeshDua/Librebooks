import React from "react";

import LibPage from "@/components/library/libPage";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const homeContent = {
  heading: "Discover. Read. Share. — LibreBooks",
  description:
    "Your personal free books library. Read your favorite public books online, save them for later, and share what inspires you — beautifully built for both mobile and desktop readers.",
  button: {
    text: "Explore Library",
    url: "/library",
  },
  reviews: {
    count: 200,
    rating: 5.0,
    avatars: [
      { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp", alt: "Avatar 1" },
      { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp", alt: "Avatar 2" },
      { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp", alt: "Avatar 3" },
      { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp", alt: "Avatar 4" },
      { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp", alt: "Avatar 5" },
    ],
  },
};



async function HomePage(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const supabase = createClient()
  const { data: user } = await (await supabase).auth.getClaims()
  if (user?.claims && pathname === '/') {
    redirect('/library');
  }
  return (
    <LibPage {...homeContent} />
  );
}

export default HomePage;
