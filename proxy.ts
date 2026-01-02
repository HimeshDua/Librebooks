import {updateSession} from '@/lib/supabase/middleware';
import {type NextRequest} from 'next/server';
// import {createClient} from './lib/supabase/server';

export async function proxy(request: NextRequest) {
  // const supabase = createClient();

  // const path = request.nextUrl.pathname;
  // const redirectUrl = request.nextUrl.clone();
  // redirectUrl.pathname = '/library';

  // const { data: { user } } = await (await supabase).auth.getUser();

  // if (user && path === '/') {
  //   return NextResponse.redirect(redirectUrl);
  // }
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
