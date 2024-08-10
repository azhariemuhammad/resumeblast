import React, { Fragment } from 'react'
import {
    Box,
    VStack,
    HStack,
    Text,
    Image,
    Heading,
    Divider,
    UnorderedList,
    ListItem,
    Grid,
    GridItem,
    Menu,
    MenuButton,
    Button,
    MenuList,
    MenuItem
} from '@chakra-ui/react'
import { Resume } from '../../types'
import { format } from 'date-fns'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { sectionItems } from '../shared'

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

const PersonalInfo = ({ data }) => {
    return (
        <Grid templateColumns="repeat(10, 1fr)" gap={4}>
            <GridItem colSpan={4} alignSelf="flex-start">
                <Heading as="h2" size="md">
                    Details
                </Heading>
                <Text>{data.phoneNumber}</Text>
                <Text>{data.email}</Text>
                <Text>{data.address}</Text>
                <Text>{data.linkedin}</Text>
            </GridItem>
            <GridItem colSpan={6} alignSelf="flex-start">
                <Heading as="h2" size="md">
                    Profile
                </Heading>
                <Text w="full" whiteSpace="pre-wrap">
                    {data.description}
                </Text>
            </GridItem>
        </Grid>
    )
}

const Experiences = ({ data }) => {
    return (
        <VStack spacing={4} alignItems="flex-start">
            <Heading as="h2" size="md">
                Experience
            </Heading>
            {data.experiences.map((exp, index) => (
                <Grid key={index} templateColumns="repeat(10, 1fr)" gap={4}>
                    <GridItem colSpan={4} alignSelf="flex-start">
                        <Text fontWeight="bold">{`${format(exp.startDate, 'yyyy')} - ${format(
                            exp.endDate,
                            'yyyy'
                        )}`}</Text>
                    </GridItem>
                    <GridItem colSpan={6} alignSelf="flex-start">
                        <Text fontWeight="bold">{exp.title}</Text>
                        <Text fontWeight="medium">{exp.company}</Text>
                        <Text fontStyle="italic">{exp.location}</Text>
                        <Text>{exp.description}</Text>
                    </GridItem>
                </Grid>
            ))}
        </VStack>
    )
}

const Education = ({ data }) => {
    return (
        <VStack spacing={4} alignItems="flex-start">
            <Heading as="h2" size="md">
                Education
            </Heading>
            {data.education.map((edu, index) => (
                <Grid key={index} templateColumns="repeat(10, 1fr)" gap={4} w="full">
                    <GridItem colSpan={4} alignSelf="flex-start">
                        <Text fontWeight="bold">{`${format(edu.startDate, 'yyyy')} - ${format(
                            edu.endDate,
                            'yyyy'
                        )}`}</Text>
                    </GridItem>
                    <GridItem colSpan={6} alignSelf="flex-start">
                        <Text fontWeight="bold">
                            {edu.degree} in {edu.major}
                        </Text>
                        <Text fontWeight="medium">{edu.university || edu.school}</Text>
                        <Text fontStyle="italic">{edu.location}</Text>
                        <Text>{edu.description}</Text>
                    </GridItem>
                </Grid>
            ))}
        </VStack>
    )
}

const Skills = ({ data }) => {
    return (
        <VStack spacing={4} alignItems="flex-start">
            <Heading as="h2" size="md">
                Skills
            </Heading>
            <UnorderedList spacing={2} w="full">
                {data.skills.map((skill, index) => (
                    <ListItem key={index}>
                        {skill.name} - {skill.score}/10
                    </ListItem>
                ))}
            </UnorderedList>
        </VStack>
    )
}

const Certifications = ({ data }) => {
    return (
        <VStack spacing={4} alignItems="flex-start">
            <Heading as="h2" size="md">
                Certifications
            </Heading>
            {data.certifications.map((cert, index) => (
                <HStack key={index} justifyContent="space-between">
                    <Text fontWeight="medium">{cert.name}</Text>
                    <Text>{format(cert.date, 'yyyy')}</Text>
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

type StackResumeProps = {
    data: Resume
    onAddSection: (title: string) => void
    layout: { component: React.ReactNode; title: string }[]
}

const StackResume: React.FC<StackResumeProps> = ({ data, onAddSection, layout }) => {
    console.log({ layout })
    return (
        <Box maxW="1200px" w="full" margin="auto" padding={8} boxShadow="md" borderRadius="md" bg="white">
            <Header data={data} />
            <VStack align="stretch" spacing={6}>
                {layout.map((section, index) => (
                    <Fragment key={index}>{React.createElement(componentMap[section.title], { data })}</Fragment>
                ))}
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
            </VStack>
        </Box>
    )
}

export default StackResume
