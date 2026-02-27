import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    const response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // PERFORMANCE OPTIMIZATION: Check for Supabase session cookies before creating the client and calling getUser()
    // This avoids unnecessary network calls and potential timeouts for unauthenticated users
    const hasSessionCookie = request.cookies.getAll().some(cookie =>
        cookie.name.startsWith('sb-') && cookie.name.endsWith('-auth-token')
    )

    if (!hasSessionCookie) {
        return response
    }

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    // This is essentially a "refresh" of the session if it's expired
    // and it will trigger the set() or remove() callbacks above to update cookies
    try {
        await supabase.auth.getUser()
    } catch (error) {
        console.error('Middleware auth error:', error)
    }

    return response
}

export async function middleware(request: NextRequest) {
    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - .svg, .png, .jpg, .jpeg, .gif, .webp (image files)
         * - manifest.json, sw.js, workbox-*.js (PWA files)
         */
        '/((?!_next/static|_next/image|favicon.ico|manifest\\.json|sw\\.js|workbox-.*\\.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
