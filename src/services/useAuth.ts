import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { useCookies } from 'react-cookie'
import supabase from '../supabaseClient'
import { User, userAtom } from '../atom/userAtom'
import { useAtom, useSetAtom } from 'jotai'

const maxAge = 7 * 24 * 60 * 60

export const useAuth = () => {
    const [_, setCookie] = useCookies(['supabase_session'])
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            if (session) {
                setCookie('supabase_session', JSON.stringify(session), { maxAge })
            }
            setLoading(false)
        })

        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setSession(session)
                setCookie('supabase_session', JSON.stringify(session), { maxAge })
            } else {
                setCookie('supabase_session', null, { maxAge })
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    const signUp = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (data) {
            setSession(data.session)
            setCookie('supabase_session', JSON.stringify(data.session), { maxAge })
        }
        return { data, error }
    }

    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (data) {
            setSession(data.session)
            setCookie('supabase_session', JSON.stringify(data.session), { maxAge })
        }
        return { data, error }
    }

    return { session, loading, signUp, signIn }
}
