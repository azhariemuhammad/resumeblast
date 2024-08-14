import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    HStack,
    Heading,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    VStack
} from '@chakra-ui/react'
import { StackResume } from './examples/StackResume'

import { ResumeBuilder } from './ResumeBuilder'
import { ExperienceInput, PersonalInfoInput, SkillsInput, EducationInput, CertificationsInput } from './SectionForms'
import { useAtom } from 'jotai'
import { layoutAtom } from '../atom/layoutAtom'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { draftAtom } from '../atom/draftAtom'
import { LayoutStyles, Resume, ResumeData, SaveResumeProps, WatermarkStyle } from '../types'
import { SaveAsPdfButton } from './DownloadPdf'
import { ChevronDownIcon, ViewIcon } from '@chakra-ui/icons'
import { Watermark, useWatermark } from './Watermark'
import { sectionItems } from './shared'
import { AuthWrapper } from './AuthWrapper'
import { stylesAtom } from '../atom/stylesAtom'
import { watermarkAtom } from '../atom/watermarkAtom'
import { Collections } from '../pages/Collections'
import { useGenerateImage } from '../hooks/useGenerateImage'

type EditorLayoutProps = {
    savedLayout?: Array<string>
    onSave: (values: SaveResumeProps) => void
    children?: React.ReactNode
    colomns?: number
    styles: LayoutStyles
    watermark: WatermarkStyle
    isCandidateForm?: boolean
    resumeId?: string
    isTemplate?: boolean
    defaultLayoutName?: string
    onShowPreview: () => void
}
export const EditorLayout = ({
    onSave,
    colomns = 1,
    watermark,
    isCandidateForm,
    resumeId,
    savedLayout,
    onShowPreview,
    isTemplate,
    defaultLayoutName
}: EditorLayoutProps) => {
    const hasResumeId = Boolean(resumeId)
    const [status, setStatus] = useState<'loading' | 'done' | 'error'>('done')
    const [hover, setHover] = useState(false)
    const [currentWatermark] = useAtom(watermarkAtom)
    const [layout, setLayout] = useAtom(layoutAtom)
    const [layoutName, setLayoutName] = useState(defaultLayoutName)
    const [currentStyles, setCurrentStyles] = useAtom(stylesAtom)
    const [draft, setDraft] = useAtom(draftAtom)
    const ref = useRef<HTMLDivElement>(null)
    const { generateImage } = useGenerateImage(ref)
    const { applyWatermark, removeWatermark } = useWatermark(ref, watermark as WatermarkStyle)
    const handleSave = (draft: Resume) => {
        setDraft(draft)
    }

    const getComponentByTitle = useCallback((title: string) => {
        switch (title) {
            case 'Personal Info':
                return <PersonalInfoInput onSave={handleSave} />
            case 'Experiences':
                return <ExperienceInput onSave={handleSave} />
            case 'Education':
                return <EducationInput onSave={handleSave} />
            case 'Skills':
                return <SkillsInput onSave={handleSave} />
            case 'Certifications':
                return <CertificationsInput onSave={handleSave} />
        }
    }, [])

    const handleSaveDraft = () => {
        const layoutTitles = layout.map(section => section.title)
        onSave({
            draft,
            layoutTitles,
            layoutName,
            watermark: currentWatermark as WatermarkStyle,
            styles: currentStyles
        })
    }

    const onAddSection = (title: string) => {
        const component = getComponentByTitle(title)

        const newLayout = [...layout, { component, title }]

        setLayout(newLayout)
    }

    const onRemoveSection = (title: string) => {
        setLayout(prevLayout => prevLayout.filter(section => section.title !== title))
    }

    useEffect(() => {
        let component: React.ReactNode
        if (savedLayout.length === 0) {
            return
        }
        const newLayout = savedLayout.map((title: string) => {
            component = getComponentByTitle(title)
            return { component, title }
        })

        if (newLayout.length > 0) {
            setLayout(newLayout)
        }
    }, [])

    const handleSaveStyles = (newStyles: any, title) => {
        setCurrentStyles({ ...currentStyles, [title]: newStyles })
    }

    const handleChangeDraftTitle = e => {
        e.preventDefault()
        const value = e.target.value
        setLayoutName(value)
    }

    const handleOpenEditor = (template: ResumeData) => {
        // remove isCandidateForm
        onSave({
            draft,
            layoutTitles: template.layout,
            layoutName: template.layout_name,
            styles: template.styles,
            watermark: template.watermark,
            redirectTo: `/editor?resumeId=${resumeId}`
        })
    }

    const handlePublish = async () => {
        setStatus('loading')

        let imageUrl = ''
        try {
            imageUrl = await generateImage()
        } catch (err) {
            console.error(err)
        } finally {
            onSave({
                draft,
                layoutTitles: layout.map(section => section.title),
                layoutName,
                styles: currentStyles,
                watermark: currentWatermark as WatermarkStyle,
                imageUrl: imageUrl ?? '',
                redirectTo: `/collections`
            })
            setStatus('done')
        }
    }

    return (
        <Grid templateColumns="repeat(10, 1fr)" gap={4} p={4}>
            {!isCandidateForm && (
                <>
                    <GridItem colSpan={4}>
                        <Input
                            type="text"
                            autoFocus
                            placeholder="Untitled template"
                            mb={4}
                            variant="unstyled"
                            fontSize="xl"
                            defaultValue={defaultLayoutName}
                            onChange={handleChangeDraftTitle}
                        />
                        <ResumeBuilder layout={layout} />
                    </GridItem>
                    <GridItem colSpan={6}>
                        <Flex justifyContent="space-between" mb={4}>
                            <HStack>
                                <Button size="sm" variant="outline" rightIcon={<ViewIcon />} onClick={onShowPreview}>
                                    Preview
                                </Button>
                                <Watermark applyWatermark={applyWatermark} removeWatermark={removeWatermark} />
                            </HStack>
                            <HStack>
                                <AuthWrapper onAuthRequired={() => handleSaveDraft()}>
                                    <Button variant="ghost" size="sm" isDisabled={status === 'loading'}>
                                        Save
                                    </Button>
                                </AuthWrapper>
                                <SaveAsPdfButton
                                    ref={ref}
                                    onHover={() => setHover(true)}
                                    onMouseLeave={() => setHover(false)}
                                />
                                {isTemplate && (
                                    <Button size="sm" onClick={handlePublish} isDisabled={status === 'loading'}>
                                        Publish
                                    </Button>
                                )}
                            </HStack>
                        </Flex>
                        <Box
                            maxW="1200px"
                            w="full"
                            margin="auto"
                            boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;"
                            borderRadius="md"
                            bg="white"
                        >
                            <VStack ref={ref} padding={8}>
                                {colomns === 1 && (
                                    <StackResume
                                        data={draft}
                                        currentStyles={currentStyles}
                                        onSaveStyles={handleSaveStyles}
                                        layout={layout}
                                        onRemoveSection={onRemoveSection}
                                    />
                                )}
                            </VStack>
                            {!hover && (
                                <Box
                                    borderStyle="dashed"
                                    borderWidth="1px"
                                    borderColor="primary.500"
                                    p={4}
                                    rounded="md"
                                    height="200px"
                                    textAlign="center"
                                    alignContent="center"
                                    _hover={{ borderColor: 'primary.8   00' }}
                                    w="full"
                                >
                                    <Menu>
                                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                            New section
                                        </MenuButton>
                                        <MenuList>
                                            {sectionItems.map(({ title }, index) => (
                                                <MenuItem key={index} onClick={() => onAddSection(title)}>
                                                    {title}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </Menu>
                                </Box>
                            )}
                        </Box>
                    </GridItem>
                </>
            )}
            {isCandidateForm && !hasResumeId && (
                <>
                    <GridItem colStart={{ base: 10, md: 3 }} colEnd={{ base: 2, md: 9 }}>
                        <Heading fontWeight="600" color="text.primary.800" size={{ base: 'sm', md: 'md' }} mb={4}>
                            Input candidates details
                        </Heading>
                        <Flex justifyContent="flex-end" my={4}>
                            <AuthWrapper onAuthRequired={() => handleSaveDraft()}>
                                <Button size="sm">Save</Button>
                            </AuthWrapper>
                        </Flex>
                        <ResumeBuilder layout={layout} />
                    </GridItem>
                </>
            )}

            {isCandidateForm && hasResumeId && (
                <>
                    <GridItem colSpan={4}>
                        <ResumeBuilder layout={layout} />
                    </GridItem>
                    <GridItem colSpan={6}>
                        <Collections title="Select a template" isCandidateForm onClick={handleOpenEditor} />
                    </GridItem>
                </>
            )}
        </Grid>
    )
}
