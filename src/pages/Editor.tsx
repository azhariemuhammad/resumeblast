import { Button, Flex, Stack, useToast } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { EditorLayout } from '../components/EditorLayout'
import { Header } from '../components/Header'
import { useAtom } from 'jotai'
import { userAtom } from '../atom/userAtom'
import { useResumeService } from '../services/useResumeService'

import { useAuth } from '../services/useAuth'
import { Resume, SaveResumeProps } from '../types'
import { useNavigate, useParams } from 'react-router-dom'
import { url } from 'inspector'
import { draftAtom } from '../atom/draftAtom'
import { layoutAtom } from '../atom/layoutAtom'

export const Editor = () => {
    const [user] = useAtom(userAtom)
    const navigate = useNavigate()

    const toast = useToast()
    const urlParams = new URLSearchParams(window.location.search)
    const resumeId = urlParams.get('resumeId') ?? ''

    const [_, setDraft] = useAtom(draftAtom)

    const { saveResume, getResumeById } = useResumeService()
    const { session } = useAuth()
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
        const data = await saveResume({ draft, layoutTitles, watermark, userId })

        if (data?.[0]?.id) {
            navigate('/editor?resumeId=' + data[0].id)
        }
    }

    const savedLayout = data?.layout as Array<{ component: React.ReactNode; title: string }>

    return (
        <Stack>
            <Header />
            {!isLoading && <EditorLayout onSave={handleSave} savedLayout={savedLayout} />}
        </Stack>
    )
}
