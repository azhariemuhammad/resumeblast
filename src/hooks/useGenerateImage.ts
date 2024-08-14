import html2canvas from 'html2canvas'
import { useUploadResumeImage } from '../services/useCreateResumeImage'

export const useGenerateImage = (ref: React.RefObject<HTMLDivElement>) => {
    const { uploadResumeImage } = useUploadResumeImage()
    const generateImage = async () => {
        let imageUrl = ''
        if (!ref.current) return
        try {
            const clone = ref.current.cloneNode(true)

            // Apply styles to ensure the clone renders correctly
            clone.style.position = 'absolute'
            clone.style.left = '-9999px'
            clone.style.top = '-9999px'
            document.body.appendChild(clone)

            // Reduce text size in the cloned element
            const textElements = clone.querySelectorAll('*')
            textElements.forEach(el => {
                const computedStyle = window.getComputedStyle(el)
                if (computedStyle.fontSize) {
                    el.style.fontSize = `${parseFloat(computedStyle.fontSize) * 0.5}px` // Reduce to 50%
                }
            })
            // Capture the entire styled component as an image
            const canvas = await html2canvas(ref.current, {
                scale: 2, // Increase quality
                useCORS: true, // If you have any external resources
                logging: false, // Disable logging
                windowWidth: 1024, // Set a consistent width
                windowHeight: 1448 // Approximately A4 height at 72 DPI
            })

            // Convert the canvas to a blob
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))

            // Send the blob to your backend
            const formData = new FormData()
            formData.append('image', blob, 'resume.png')

            const { src } = await uploadResumeImage(formData)

            return src
        } catch (err) {
            console.error(err)
        }
    }

    return { generateImage }
}
