import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    VStack
} from '@chakra-ui/react'
import StackResume from './examples/StackResume'

import { ResumeBuilder } from './ResumeBuilder'
import { ExperienceInput, PersonalInfoInput, SkillsInput, EducationInput, CertificationsInput } from './SectionForms'
import { useAtom } from 'jotai'
import { layoutAtom } from '../atom/layoutAtom'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { draftAtom } from '../atom/draftAtom'
import { LayoutStyles, Resume, SaveResumeProps } from '../types'
import { SaveAsPdfButton } from './DownloadPdf'
import { ChevronDownIcon, ViewIcon } from '@chakra-ui/icons'
import { Watermark, useWatermark } from './Watermark'
import { sectionItems } from './shared'
import { useNavigate } from 'react-router-dom'
import { AuthWrapper } from './AuthWrapper'
import { set } from 'date-fns'

export const GridTwoLayout = () => {
    return (
        <Box>
            <div>Grid 2</div>
        </Box>
    )
}

type EditorLayoutProps = {
    savedLayout?: Array<string>
    onSave: (values: SaveResumeProps) => void
    children?: React.ReactNode
    colomns?: number
    watermark: LayoutStyles & { watermarkText: string }
}
export const EditorLayout = ({ onSave, colomns = 1, savedLayout = [], watermark = {} }: EditorLayoutProps) => {
    const [hover, setHover] = useState(false)
    const [layout, setLayout] = useAtom(layoutAtom)
    const [draft, setDraft] = useAtom(draftAtom)
    const navigate = useNavigate()
    const ref = useRef<HTMLDivElement>(null)
    const { applyWatermark, removeWatermark, currentWatermark } = useWatermark(ref, watermark)
    const handleSave = (draft: Resume) => {
        setDraft(draft)
    }

    const handleSaveDraft = () => {
        const layoutTitles = layout.map(section => section.title)
        onSave({ draft, layoutTitles, watermark: currentWatermark as LayoutStyles & { watermarkText: string } })
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

    return (
        <Grid templateColumns="repeat(10, 1fr)" gap={4} p={4}>
            <GridItem colSpan={4}>
                <ResumeBuilder layout={layout} />
            </GridItem>
            <GridItem colSpan={6}>
                <Flex justifyContent="space-between" mb={4}>
                    <HStack>
                        <Button
                            size="sm"
                            variant="outline"
                            rightIcon={<ViewIcon />}
                            onClick={() => navigate('/preview?template=stack')}
                        >
                            Preview
                        </Button>
                        <Watermark applyWatermark={applyWatermark} removeWatermark={removeWatermark} />
                    </HStack>
                    <HStack>
                        <AuthWrapper onAuthRequired={() => handleSaveDraft()}>
                            <Button variant="ghost" size="sm">
                                Save
                            </Button>
                        </AuthWrapper>
                        <SaveAsPdfButton
                            ref={ref}
                            onHover={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        />
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
                            <StackResume data={draft} layout={layout} onRemoveSection={onRemoveSection} />
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
                                    Add new section
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
        </Grid>
    )
}
