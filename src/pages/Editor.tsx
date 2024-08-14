import { Stack, useDisclosure, useToast } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { EditorLayout } from '../components/EditorLayout'
import { Header } from '../components/Header'
import { Provider, useAtom } from 'jotai'
import { userAtom } from '../atom/userAtom'
import { useResumeService } from '../services/useResumeService'
import { Resume, SaveResumeProps } from '../types'
import { baseDraft, draftAtom } from '../atom/draftAtom'
import { useHydrateAtoms } from 'jotai/utils'
import { stylesAtom } from '../atom/stylesAtom'
import { mock } from '../mockData'
import { Preview } from './Preview'

export const Editor = () => {
    const { isOpen: showPreview, onOpen: onShowPreview, onClose: onHidePreview } = useDisclosure()
    const [user] = useAtom(userAtom)
    const [_, setDraft] = useAtom(draftAtom)
    const navigate = useNavigate()
    const toast = useToast()

    const urlParams = new URLSearchParams(window.location.search)
    const resumeId = urlParams.get('resumeId') ?? ''
    const newTemplate = urlParams.get('newtemplate') === 'true'
    const isCandidateForm = urlParams.get('isCandidateForm') === 'true'

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

    let savedLayout = data?.layout ?? []
    const draft = data?.data ?? baseDraft
    const isTemplate = data?.is_template ?? newTemplate
    const defaultLayoutName = data?.layout_name ?? ''

    const handleSave = async ({
        draft,
        imageUrl,
        layoutTitles,
        watermark,
        styles,
        layoutName,
        redirectTo,
        layoutType
    }: SaveResumeProps) => {
        const data = await saveResume({
            draft,
            layoutTitles,
            imageUrl,
            watermark,
            userId,
            resumeId,
            styles,
            layoutName,
            isTemplate,
            layoutType
        })
        if (redirectTo) {
            window.location.href = redirectTo
        }

        if (data?.[0]?.id && !redirectTo) {
            navigate(
                isCandidateForm
                    ? `/editor?resumeId=${data[0].id}&isCandidateForm=true`
                    : `/editor?resumeId=${data[0].id}`,
                { replace: true }
            )
        }
    }

    if (isCandidateForm) {
        savedLayout = ['Personal Info', 'Experiences', 'Education', 'Skills', 'Certifications']
    }
    const watermark = data?.watermark ?? {}
    const styles = data?.styles ?? {}

    const HydrateAtoms = ({ initialValues, children }: { initialValues: any; children: React.ReactNode }) => {
        useHydrateAtoms(initialValues)
        return children
    }

    //http://localhost:3003/editor?resumeId=87b64f89-0bf8-4544-8024-b5f7dab56712&isCandidateForm=true

    return (
        <>
            <Provider>
                {showPreview ? (
                    <HydrateAtoms
                        initialValues={[
                            [stylesAtom, styles],
                            [draftAtom, draft]
                        ]}
                    >
                        <Preview onHidePreview={() => onHidePreview()} />
                    </HydrateAtoms>
                ) : (
                    <Stack>
                        <Header />
                        {!isLoading && (
                            <HydrateAtoms
                                initialValues={[
                                    [stylesAtom, styles],
                                    [draftAtom, draft]
                                ]}
                            >
                                <EditorLayout
                                    styles={styles}
                                    watermark={watermark}
                                    onSave={handleSave}
                                    savedLayout={savedLayout}
                                    isCandidateForm={isCandidateForm}
                                    resumeId={resumeId}
                                    isTemplate={isTemplate}
                                    onShowPreview={onShowPreview}
                                    defaultLayoutName={defaultLayoutName}
                                />
                            </HydrateAtoms>
                        )}
                    </Stack>
                )}
            </Provider>
        </>
    )
}
