import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  console.log('Middleware: Checking request for path:', request.nextUrl.pathname)

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => request.cookies.get(name)?.value,
        set: (name: string, value: string, options: CookieOptions) => {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove: (name: string, options: CookieOptions) => {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
      cookieOptions: {
        name: 'sb-auth-token',
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      }
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  console.log('Middleware: User status:', user ? 'Authenticated' : 'Not authenticated')

  // If user is signed in and trying to access the root path
  if (user && request.nextUrl.pathname === '/') {
    console.log('Middleware: Checking if user exists in profiles:', user.id)
    
    // Check if user exists in profiles table
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)

    if (error) {
      console.error('Middleware: Error fetching profile:', error)
      return response
    }

    console.log('Middleware: Profile exists:', data && data.length > 0)

    // If user doesn't exist in profiles, let them stay on the page
    if (!data || data.length === 0) {
      console.log('Middleware: Allowing access to form (profile not found)')
      return response
    }

    // If user exists in profiles, redirect to dashboard
    console.log('Middleware: Redirecting to dashboard (profile exists)')
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If user is not signed in and trying to access protected routes
  if (!user && !['/', '/auth/callback', '/auth/auth-code-error'].includes(request.nextUrl.pathname)) {
    console.log('Middleware: Redirecting to login (not authenticated)')
    return NextResponse.redirect(new URL('/', request.url))
  }

  console.log('Middleware: Allowing request to proceed')
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
} 