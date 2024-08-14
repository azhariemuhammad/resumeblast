import html2canvas from 'html2canvas'
import { useUploadResumeImage } from '../services/useCreateResumeImage'

export const useGenerateImage = (ref: React.RefObject<HTMLDivElement>) => {
    const { uploadResumeImage } = useUploadResumeImage()
    const generateImage = async () => {
        if (!ref.current) return
        try {
            const canvas = await html2canvas(ref.current, {
                scale: 2,
                useCORS: true,
                logging: false,
                windowWidth: 2000,
                windowHeight: 1256
            })

            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))

            const formData = new FormData()
            // @ts-ignore
            formData.append('image', blob, 'resume.png')

            // @ts-ignore
            const { src } = await uploadResumeImage(formData)

            return src
        } catch (err) {
            console.error(err)
        }
    }

    return { generateImage }
}
