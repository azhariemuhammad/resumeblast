import { Stack, useToast } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { EditorLayout } from '../components/EditorLayout'
import { Header } from '../components/Header'
import { useAtom } from 'jotai'
import { userAtom } from '../atom/userAtom'
import { useResumeService } from '../services/useResumeService'
import { Resume, SaveResumeProps } from '../types'
import { draftAtom } from '../atom/draftAtom'

export const Editor = () => {
    const [user] = useAtom(userAtom)
    const [_, setDraft] = useAtom(draftAtom)
    const navigate = useNavigate()
    const toast = useToast()

    const urlParams = new URLSearchParams(window.location.search)
    const resumeId = urlParams.get('resumeId') ?? ''

    const { saveResume, getResumeById } = useResumeService()
    const userId = user?.id ?? ''

    const { data, isLoading } = useQuery({
        queryKey: ['resume'],
        enabled: Boolean(resumeId),
        queryFn: () =>
            getResumeById(resumeId)
                .then(res => {
                    if (!res?.length) return
                    setDraft(res[0]?.data as Resume)
                    return res[0]
                })
                .catch(err => {
                    console.error(err)
                    toast({
                        title: 'An error occurred.',
                        description: err?.message ?? 'Please try again.',
                        status: 'error',
                        duration: 3000,
                        isClosable: true
                    })
                })
    })

    const handleSave = async ({ draft, layoutTitles, watermark }: SaveResumeProps) => {
        const data = await saveResume({ draft, layoutTitles, watermark, userId, resumeId })

        if (data?.[0]?.id) {
            navigate('/editor?resumeId=' + data[0].id, { replace: true })
        }
    }

    const savedLayout = data?.layout ?? []
    const watermark = data?.watermark ?? {}
    console.log({ watermark })

    return (
        <Stack>
            <Header />
            {!isLoading && <EditorLayout watermark={watermark} onSave={handleSave} savedLayout={savedLayout} />}
        </Stack>
    )
}
