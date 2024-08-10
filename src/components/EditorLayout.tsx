import { Box, Grid, GridItem } from '@chakra-ui/react'
import StackResume from './examples/StackResume'

import { ResumeBuilder } from './ResumeBuilder'
import { ExperienceInput, PersonalInfoInput, SkillsInput, EducationInput, CertificationsInput } from './SectionForms'
import { useAtom, useAtomValue } from 'jotai'
import { layoutAtom } from '../atom/layoutAtom'
import React, { useEffect } from 'react'
import { draftAtom } from '../atom/draftAtom'
import { Resume } from '../types'

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

export const StackLayout = ({ onAddSection, layout }) => {
    const draft = useAtomValue(draftAtom)
    return <StackResume data={draft} onAddSection={onAddSection} layout={layout} />
}

type EditorLayoutProps = {
    children?: React.ReactNode
    colomns?: number
}
export const EditorLayout = ({ children, colomns = 1 }: EditorLayoutProps) => {
    const [layout, setLayout] = useAtom(layoutAtom)
    const [_, setDraft] = useAtom(draftAtom)
    const handleSave = (draft: Resume) => {
        setDraft(draft)
    }

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

    return (
        <Grid templateColumns="repeat(10, 1fr)" gap={4} p={4}>
            <GridItem colSpan={4}>
                <ResumeBuilder layout={layout} />
            </GridItem>
            <GridItem colSpan={6}>
                {colomns === 2 && <GridTwoLayout />}
                {colomns === 1 && <StackLayout onAddSection={onAddSection} layout={layout} />}
            </GridItem>
        </Grid>
    )
}
