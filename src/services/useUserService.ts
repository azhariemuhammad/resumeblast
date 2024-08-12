import supabase from '../supabaseClient'

export const useGetResumes = () => {
    const getResumeByUser = async (userId: string) => {
        const { data, error } = await supabase.from('resumes').select('*').eq('user_id', userId)
        if (error) {
            console.log(error)
        }
        return data
    }

    return { getResumeByUser }
}
type User = {
    name: string
    email: string
    agency_name: string
}
export const useUserService = () => {
    const createNewUser = async (user: {}) => {
        try {
            const { error } = await supabase.from('users').insert(user)
            if (error) {
                console.log(error)
            }
            return error
        } catch (err) {
            console.log(err)
        }
    }

    const getUser = async (email: string) => {
        console.log({ email })
        const { data, error } = await supabase.from('users').select('*').eq('email', email)
        if (error) {
            console.log(error)
        }
        return data
    }

    return { createNewUser, getUser }
}
