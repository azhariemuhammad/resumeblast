import React from 'react'
import { VStack, HStack, Text, Image, Heading, UnorderedList, ListItem, Grid, GridItem, Box } from '@chakra-ui/react'
import { LayoutStyles, Resume } from '../../types'
import { format } from 'date-fns'
import { StyleControlWrapper } from '../StyleController'

type SectionProps = {
    data: Resume
    styles: LayoutStyles
}

const Header = ({ data }) => {
    return (
        <HStack spacing={12} alignItems="flex-start" mb={8}>
            <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                alt={`${data.firstName} ${data.lastName}`}
                borderRadius="full"
                boxSize="150px"
                objectFit="cover"
            />
            <VStack align="flex-start" spacing={2}>
                <Heading as="h1" size="xl">{`${data.firstName} ${data.lastName}`}</Heading>
                <Text fontSize="xl" color="gray.600">
                    {data.experiences[0]?.title || 'Professional Title'}
                </Text>
            </VStack>
        </HStack>
    )
}

const PersonalInfo = ({ data, styles }: SectionProps) => {
    const textStyles = {
        fontSize: styles.fontSize,
        color: styles.color,
        fontFamily: styles.fontFamily,
        textAlign: styles.alignment
    }

    return (
        <>
            <Header data={data} />

            <Grid
                gridAutoColumns={styles.layout === 'col' ? 'repeat(10, 1fr)' : '1fr'}
                gap={4}
                gridAutoFlow={styles.layout === 'col' ? 'column' : 'row'}
                justifyItems={styles.alignment}
                justifyContent="space-between"
            >
                <GridItem>
                    <Heading as="h2" size="md" textAlign={styles.alignment}>
                        Details
                    </Heading>
                    <Text {...textStyles}>{data.phoneNumber}</Text>
                    <Text {...textStyles}>{data.email}</Text>
                    <Text {...textStyles}>{data.address}</Text>
                    <Text {...textStyles}>{data.linkedin}</Text>
                </GridItem>
                <GridItem>
                    <Heading as="h2" size="md" textAlign={styles.alignment}>
                        Profile
                    </Heading>
                    <Text w="full" whiteSpace="pre-wrap" {...textStyles}>
                        {data.description}
                    </Text>
                </GridItem>
            </Grid>
        </>
    )
}

const Experiences = ({ data, styles }: SectionProps) => {
    const textStyles = {
        fontSize: styles.fontSize,
        color: styles.color,
        fontFamily: styles.fontFamily,
        textAlign: styles.alignment
    }
    return (
        <VStack spacing={4} alignItems="flex-start">
            <Heading as="h2" size="md" w="full" textAlign={styles.alignment}>
                Experience
            </Heading>
            {data.experiences.map((exp, index) => (
                <Grid
                    key={index}
                    gridAutoColumns={styles.layout === 'col' ? 'repeat(10, 1fr)' : '1fr'}
                    gap={4}
                    gridAutoFlow={styles.layout === 'col' ? 'row' : 'column'}
                    justifyItems={styles.alignment}
                    justifyContent="space-between"
                >
                    <GridItem {...textStyles}>
                        {exp.startDate && exp.endDate ? (
                            <Text fontWeight="bold">{`${format(exp.startDate, 'yyyy')} - ${format(
                                exp.endDate,
                                'yyyy'
                            )}`}</Text>
                        ) : (
                            <Text fontWeight="bold"></Text>
                        )}
                    </GridItem>
                    <GridItem>
                        <Text fontWeight="bold" {...textStyles}>
                            {exp.title}
                        </Text>
                        <Text fontWeight="medium" {...textStyles}>
                            {exp.company}
                        </Text>
                        <Text fontStyle="italic" {...textStyles}>
                            {exp.location}
                        </Text>
                        <Text {...textStyles}>{exp.description}</Text>
                    </GridItem>
                </Grid>
            ))}
        </VStack>
    )
}

const Education = ({ data, styles }: SectionProps) => {
    const textStyles = {
        fontSize: styles.fontSize,
        color: styles.color,
        fontFamily: styles.fontFamily
    }
    return (
        <VStack spacing={4} alignItems="flex-start" w="full">
            <Heading as="h2" size="md" w="full" textAlign={styles.alignment}>
                Education
            </Heading>
            {data.education.map((edu, index) => (
                <Grid
                    key={index}
                    gridAutoColumns={styles.layout === 'col' ? 'repeat(10, 1fr)' : '1fr'}
                    gap={4}
                    w="full"
                    gridAutoFlow={styles.layout === 'col' ? 'column' : 'row'}
                    justifyItems={styles.alignment}
                    justifyContent="space-between"
                >
                    <GridItem>
                        {edu.startDate && edu.endDate ? (
                            <Text fontWeight="bold" {...textStyles}>
                                {`${format(edu.startDate, 'yyyy')} - ${format(edu.endDate, 'yyyy')}`}
                            </Text>
                        ) : (
                            <Text fontWeight="bold" {...textStyles}></Text>
                        )}
                    </GridItem>
                    <GridItem textAlign={styles.alignment}>
                        <Text fontWeight="bold" {...textStyles}>
                            {edu.degree} in {edu.major}
                        </Text>
                        <Text fontWeight="medium" {...textStyles}>
                            {edu.university || edu.school}
                        </Text>
                        <Text fontStyle="italic" {...textStyles}>
                            {edu.location}
                        </Text>
                        <Text {...textStyles}>{edu.description}</Text>
                    </GridItem>
                </Grid>
            ))}
        </VStack>
    )
}

const Skills = ({ data, styles }: SectionProps) => {
    const textStyles = {
        fontSize: styles.fontSize,
        color: styles.color,
        fontFamily: styles.fontFamily,
        textAlign: styles.alignment
    }

    return (
        <VStack spacing={4} alignItems="flex-start">
            <Heading as="h2" size="md" w="full" textAlign={styles.alignment}>
                Skills
            </Heading>
            <UnorderedList spacing={2} w="full" textAlign={styles.alignment}>
                {data.skills.map((skill, index) => (
                    <ListItem key={index}>
                        <Text fontWeight="bold" {...textStyles}>
                            {skill.name}
                        </Text>
                        <Text {...textStyles}>{skill.score}/10</Text>
                    </ListItem>
                ))}
            </UnorderedList>
        </VStack>
    )
}

const Certifications = ({ data, styles }: SectionProps) => {
    const textStyles = {
        fontSize: styles.fontSize,
        color: styles.color,
        fontFamily: styles.fontFamily,
        textAlign: styles.alignment
    }

    return (
        <VStack spacing={4} alignItems="flex-start">
            <Heading as="h2" size="md" w="full" textAlign={styles.alignment}>
                Certifications
            </Heading>
            {data.certifications.map((cert, index) => (
                <HStack key={index} justifyContent="space-between" w="full">
                    <Text fontWeight="medium" {...textStyles}>
                        {cert.name}
                    </Text>
                    {cert.date && <Text {...textStyles}>{format(cert.date, 'yyyy')}</Text>}
                </HStack>
            ))}
        </VStack>
    )
}

type SectionTitle = 'Personal Info' | 'Experiences' | 'Education' | 'Skills' | 'Certifications'

type SectionComponent = React.ComponentType<{ data: any }>

type ComponentMap = {
    [K in SectionTitle]: SectionComponent
}

const componentMap: ComponentMap = {
    'Personal Info': PersonalInfo,
    Experiences: Experiences,
    Education: Education,
    Skills: Skills,
    Certifications: Certifications
}

type TwoColumnLayout = {
    data: Resume
    layout: { component: React.ReactNode; title: string }[]
    onRemoveSection?: (title: string) => void
    onSaveStyles?: (styles: any, title: string) => void
    disabled?: boolean
    currentStyles: LayoutStyles
}

export const TwoColumnLayout: React.FC<TwoColumnLayout> = ({
    data,
    layout,
    disabled = false,
    currentStyles = {},
    onSaveStyles = () => {},
    onRemoveSection = () => {}
}) => {
    const leftSections = layout.slice(0, 3)
    const rightSections = layout.slice(3)

    return (
        <Grid templateColumns="repeat(10, 1fr)" gap={4}>
            <GridItem colSpan={6}>
                <Grid templateRows="repeat(3, 1fr)" gap={4}>
                    {leftSections.map((section, index) => (
                        <GridItem key={index}>
                            <StyleControlWrapper
                                defaultValue={currentStyles[section.title]}
                                onSaveStyles={styles => onSaveStyles(styles, section.title)}
                                onRemoveSection={() => onRemoveSection(section.title)}
                                disabled={disabled}
                            >
                                {React.createElement(componentMap[section.title], { data })}
                            </StyleControlWrapper>
                        </GridItem>
                    ))}
                </Grid>
            </GridItem>

            <GridItem colSpan={4} mb={4} bg={currentStyles?.['right-column']?.bgColor ?? 'gray.100'} w="full">
                <StyleControlWrapper
                    defaultValue={currentStyles['right-column']}
                    onSaveStyles={styles => onSaveStyles(styles, 'right-column')}
                    onRemoveSection={() => onRemoveSection('')}
                    disabled={disabled}
                    height="100%"
                    placement="left-start"
                >
                    <Box height="100%" w="full">
                        <Grid templateRows="repeat(2, 1fr)" gap={4}>
                            {rightSections.map((section, index) => (
                                <GridItem key={index} p={4}>
                                    <StyleControlWrapper
                                        defaultValue={currentStyles[section.title]}
                                        onSaveStyles={styles => onSaveStyles(styles, section.title)}
                                        onRemoveSection={() => onRemoveSection(section.title)}
                                        disabled={disabled}
                                    >
                                        {React.createElement(componentMap[section.title], { data })}
                                    </StyleControlWrapper>
                                </GridItem>
                            ))}
                        </Grid>
                    </Box>
                </StyleControlWrapper>
            </GridItem>
        </Grid>
    )
}
