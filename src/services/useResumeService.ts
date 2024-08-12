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

    const saveResume = async ({ draft, layoutTitles, watermark, userId }: SaveResumeProps & { userId: string }) => {
        const { data, error } = await await supabase
            .from('resumes')
            .upsert({
                layout_name: 'template-stack',
                data: draft,
                layout: layoutTitles,
                styles: {},
                watermark,
                user_id: userId
            })
            .select()

        if (error) {
            console.log(error)
        }
        return data
    }

    return { getResumeById, saveResume }
}
