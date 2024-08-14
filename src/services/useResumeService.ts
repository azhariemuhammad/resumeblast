import supabase from '../supabaseClient'
import { ResumeData, SaveResumeProps } from '../types'

export const useResumeService = () => {
    const getResumeById = async (resumeId: string) => {
        const { data, error } = await supabase.from('resumes').select('*').eq('id', resumeId)
        if (error) {
            console.log(error)
        }
        return data
    }

    const getAllResumes = async (userId: string): Promise<Array<ResumeData> | null> => {
        const { data, error } = await supabase.from('resumes').select('*').eq('user_id', userId)
        if (error) {
            console.log(error)
        }
        return data
    }

    const getAllTemplates = async (userId: string) => {
        const { data, error } = await supabase.from('resumes').select('*').eq('user_id', userId).eq('is_template', true)
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
        styles,
        layoutName = '',
        imageUrl = '',
        isTemplate = false,
        layoutType = 'one-column'
    }: SaveResumeProps & { userId: string; resumeId?: string }) => {
        const { data, error } = await await supabase
            .from('resumes')
            .upsert({
                styles,
                watermark,
                data: draft,
                layout: layoutTitles,
                layout_name: layoutName,
                is_template: isTemplate,
                image: imageUrl,
                user_id: userId,
                layout_type: layoutType,
                ...(resumeId !== '' && { id: resumeId })
            })
            .select()

        if (error) {
            console.log(error)
        }
        return data
    }

    return { getResumeById, saveResume, getAllResumes, getAllTemplates }
}
