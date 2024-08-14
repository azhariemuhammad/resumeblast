import { config } from '../config'

export const useUploadResumeImage = () => {
    const uploadResumeImage = async (body: string) => {
        const response = await fetch(`${config.baseUrl}/upload-resume-image`, {
            method: 'POST',
            body
        })

        if (!response.ok) {
            throw new Error('Failed to generate resume image')
        }

        const data = await response.json()

        return data
    }

    return { uploadResumeImage }
}
