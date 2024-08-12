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
import { useAtom, useAtomValue } from 'jotai'
import { layoutAtom } from '../atom/layoutAtom'
import React, { Fragment, forwardRef, useEffect, useRef, useState } from 'react'
import { draftAtom } from '../atom/draftAtom'
import { Resume } from '../types'
import { SaveAsPdfButton } from './DownloadPdf'
import { ArrowRightIcon, ChevronDownIcon, ViewIcon } from '@chakra-ui/icons'
import { Watermark, useWatermark } from './Watermark'
import { sectionItems } from './shared'
import { useNavigate } from 'react-router-dom'

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

type EditorLayoutProps = {
    children?: React.ReactNode
    colomns?: number
}
export const EditorLayout = ({ children, colomns = 1 }: EditorLayoutProps) => {
    const [hover, setHover] = useState(false)
    const [layout, setLayout] = useAtom(layoutAtom)
    const [draft, setDraft] = useAtom(draftAtom)
    const navigate = useNavigate()
    const handleSave = (draft: Resume) => {
        setDraft(draft)
    }
    const ref = useRef<HTMLDivElement>(null)
    const { applyWatermark, removeWatermark } = useWatermark(ref)

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
                        <Button variant="ghost" onClick={() => console.log('save')} size="sm">
                            Save
                        </Button>
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
                            <StackResume
                                data={draft}
                                onAddSection={onAddSection}
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
