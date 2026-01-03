import {createServerClient} from '@supabase/ssr';
import {NextResponse, type NextRequest} from 'next/server';
import {hasEnvVars} from '../utils';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const pathname = request.nextUrl.pathname;
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/manifest') ||
    pathname.endsWith('.webmanifest') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.ico')
  ) {
    return NextResponse.next();
  }
  if (!hasEnvVars) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({name, value}) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({request});
          cookiesToSet.forEach(({name, value, options}) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  if (pathname === '/book/favorites') {
    const {
      data: {session},
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // if (
  //   pathname !== '/' &&
  //   !user &&
  //   !pathname.startsWith('/login') &&
  //   !pathname.startsWith('/book') &&
  //   !pathname.startsWith('/about') &&
  //   !pathname.startsWith('/testicals') &&
  //   !pathname.startsWith('/manifest.ts') &&
  //   !pathname.startsWith('/manifest') &&
  //   !pathname.startsWith('/library') &&
  //   !pathname.startsWith('/book/favorites') &&
  //   !pathname.startsWith('/read') &&
  //   !pathname.startsWith('/api/read') &&
  //   !pathname.startsWith('/auth')
  // ) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = '/auth/login';
  //   return NextResponse.redirect(url);
  // }

  return supabaseResponse;
}
