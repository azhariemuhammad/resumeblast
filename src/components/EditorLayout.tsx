import { Box, Flex, Grid, GridItem } from '@chakra-ui/react'
import StackResume from './examples/StackResume'

import { mock } from '../mockData'
import { ResumeBuilder } from './ResumeBuilder'
import { ExperienceInput, PersonalInfoInput, SkillsInput, EducationInput, CertificationsInput } from './SectionForms'
import { useAtom, useAtomValue } from 'jotai'
import { layoutAtom } from '../atom/layoutAtom'
import { useEffect } from 'react'

const componentMap = {
    'Personal Info': <PersonalInfoInput />,
    Experiences: <ExperienceInput />,
    Education: <EducationInput />,
    Skills: <SkillsInput />,
    Certifications: <CertificationsInput />
}

export const GridTwoLayout = () => {
    return (
        <Box>
            <div>Grid 2</div>
        </Box>
    )
}

export const StackLayout = ({ onAddSection, layout }) => {
    return <StackResume data={mock} onAddSection={onAddSection} layout={layout} />
}

type EditorLayoutProps = {
    children?: React.ReactNode
    colomns?: number
}
export const EditorLayout = ({ children, colomns = 1 }: EditorLayoutProps) => {
    const [layout, setLayout] = useAtom(layoutAtom)

    const onAddSection = (title: string) => {
        const component = componentMap[title]
        const newLayout = [...layout, { component, title }]
        setLayout(newLayout)
    }

    useEffect(() => {
        setLayout([
            {
                component: <PersonalInfoInput />,
                title: 'Personal Info'
            }
        ])
    }, [])

    return (
        <Grid templateColumns="repeat(10, 1fr)" gap={4}>
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
