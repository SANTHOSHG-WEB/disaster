import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
    const cookieStore = await cookies()
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        console.error("Progress API: GET Unauthorized", { authError });
        return NextResponse.json({ error: 'Unauthorized', details: authError?.message }, { status: 401 })
    }

    console.log("Progress API: GET fetching for user", user.id);

    const { data, error } = await supabase
        .from('module_progress')
        .select('*')
        .eq('user_id', user.id)

    if (error) {
        console.error("Progress API: GET database error", error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}

export async function POST(request: Request) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
                set(name: string, value: string, options: any) {
                    cookieStore.set({ name, value, ...options })
                },
                remove(name: string, options: any) {
                    cookieStore.set({ name, value: '', ...options })
                },
            },
        }
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        console.error("Progress API: POST Unauthorized", { authError });
        return NextResponse.json({ error: 'Unauthorized', details: authError?.message }, { status: 401 })
    }

    const body = await request.json()
    const { moduleId, videoWatched, gameCompleted, quizCompleted, score, status } = body

    console.log("Progress API: POST upserting for user", user.id, { moduleId });

    const { data, error } = await supabase
        .from('module_progress')
        .upsert({
            user_id: user.id,
            module_id: moduleId,
            video_watched: videoWatched,
            game_completed: gameCompleted,
            quiz_completed: quizCompleted,
            quiz_score: score,
            status: status || 'in-progress',
            updated_at: new Date().toISOString()
        }, {
            onConflict: 'user_id,module_id'
        })
        .select()

    if (error) {
        console.error("Progress API: POST database error", error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0])
}
