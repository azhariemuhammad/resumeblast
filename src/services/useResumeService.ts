import supabase from '../supabaseClient'
import { Resume, SaveResumeProps } from '../types'

export const useResumeService = () => {
    const getResumeById = async (resumeId: string) => {
        const { data, error } = await supabase.from('resumes').select('*').eq('id', resumeId)
        if (error) {
            console.log(error)
        }
        return data
    }

    const getAllResumes = async (userId: string) => {
        const { data, error } = await supabase.from('resumes').select('*').eq('user_id', userId)
        if (error) {
            console.log(error)
        }
        return data
    }

    const saveResume = async ({
        draft,
        layoutTitles,
        watermark,
        userId,
        resumeId = '',
        styles
    }: SaveResumeProps & { userId: string; resumeId?: string }) => {
        const { data, error } = await await supabase
            .from('resumes')
            .upsert({
                styles,
                watermark,
                data: draft,
                layout: layoutTitles,
                layout_name: 'template-stack',
                user_id: userId,
                ...(resumeId !== '' && { id: resumeId })
            })
            .select()

        if (error) {
            console.log(error)
        }
        return data
    }

    return { getResumeById, saveResume, getAllResumes }
}
