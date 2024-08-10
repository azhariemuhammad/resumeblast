import { Box, Button, Flex, Grid, GridItem, HStack } from '@chakra-ui/react'
import StackResume from './examples/StackResume'

import { ResumeBuilder } from './ResumeBuilder'
import { ExperienceInput, PersonalInfoInput, SkillsInput, EducationInput, CertificationsInput } from './SectionForms'
import { useAtom, useAtomValue } from 'jotai'
import { layoutAtom } from '../atom/layoutAtom'
import React, { Fragment, forwardRef, useEffect, useRef, useState } from 'react'
import { draftAtom } from '../atom/draftAtom'
import { Resume } from '../types'
import { SaveAsPdfButton } from './DownloadPdf'
import { ArrowRightIcon, ViewIcon } from '@chakra-ui/icons'

type SectionTitle = 'Personal Info' | 'Experiences' | 'Education' | 'Skills' | 'Certifications'

type InputComponent = React.ComponentType<{ onSave: (draft: Resume) => void }>

type ComponentMap = {
    [K in SectionTitle]: InputComponent
}

export const GridTwoLayout = () => {
    return (
        <Box>
            <div>Grid 2</div>
        </Box>
    )
}

type StackLayoutProps = {
    onAddSection: (title: string) => void
    layout: { component: React.ReactNode; title: string }[]
}

type EditorLayoutProps = {
    children?: React.ReactNode
    colomns?: number
}
export const EditorLayout = ({ children, colomns = 1 }: EditorLayoutProps) => {
    const [hover, setHover] = useState(false)
    const [layout, setLayout] = useAtom(layoutAtom)
    const [draft, setDraft] = useAtom(draftAtom)
    const handleSave = (draft: Resume) => {
        setDraft(draft)
    }
    const ref = useRef<HTMLDivElement>(null)

    const onAddSection = (title: string) => {
        let component: React.ReactNode

        switch (title) {
            case 'Personal Info':
                component = <PersonalInfoInput onSave={handleSave} />
                break
            case 'Experiences':
                component = <ExperienceInput onSave={handleSave} />
                break
            case 'Education':
                component = <EducationInput onSave={handleSave} />
                break
            case 'Skills':
                component = <SkillsInput onSave={handleSave} />
                break
            case 'Certifications':
                component = <CertificationsInput onSave={handleSave} />
                break
        }

        const newLayout = [...layout, { component, title }]
        console.log(newLayout)
        setLayout(newLayout)
    }

    useEffect(() => {
        setLayout([
            {
                component: <PersonalInfoInput onSave={handleSave} />,
                title: 'Personal Info'
            }
        ])
    }, [])

    const onRemoveSection = (title: string) => {
        setLayout(prevLayout => prevLayout.filter(section => section.title !== title))
    }

    return (
        <Grid templateColumns="repeat(10, 1fr)" gap={4} p={4}>
            <GridItem colSpan={4}>
                <ResumeBuilder layout={layout} />
            </GridItem>
            <GridItem colSpan={6}>
                <Flex justifyContent="space-between" mb={4}>
                    <Button variant="outline" rightIcon={<ViewIcon />} onClick={() => console.log('preview')}>
                        Preview
                    </Button>
                    <HStack>
                        <Button variant="outline" onClick={() => console.log('save')}>
                            Save
                        </Button>
                        <SaveAsPdfButton
                            ref={ref}
                            onHover={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        />
                    </HStack>
                </Flex>
                <Box maxW="1200px" w="full" margin="auto" boxShadow="md" borderRadius="md" bg="white">
                    <Box ref={ref} padding={8}>
                        {colomns === 1 && (
                            <StackResume
                                data={draft}
                                onAddSection={onAddSection}
                                layout={layout}
                                hide={!hover}
                                onRemoveSection={onRemoveSection}
                            />
                        )}
                    </Box>
                </Box>
            </GridItem>
        </Grid>
    )
}
