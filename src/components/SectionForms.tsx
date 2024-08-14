import {
    Button,
    FormControl,
    FormLabel,
    Grid,
    SimpleGrid,
    Input,
    Textarea,
    VStack,
    GridItem,
    Container
} from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { useDebounce } from '../hooks/useDebounce'
import { Fragment, useEffect, useRef } from 'react'

type AddMoreButtonProps = {
    onAdd: () => void
    onRemove?: () => void
}

const AddMoreButton = ({ onAdd, onRemove }: AddMoreButtonProps) => (
    <SimpleGrid columns={10} justifyContent="center" w="full" gap={2}>
        <GridItem colStart={{ base: 1, md: 5 }} colSpan={{ base: 10, md: 2 }} w="full">
            {onRemove ? (
                <Button w="100%" aria-label="remove" size="sm" variant="outline" onClick={onRemove}>
                    Remove
                </Button>
            ) : (
                <Button w="100%" aria-label="add" size="sm" variant="outline" onClick={onAdd}>
                    Add more +
                </Button>
            )}
        </GridItem>
    </SimpleGrid>
)

export const PersonalInfoInput = ({ onSave }) => {
    const { values, handleChange } = useFormikContext()

    const debouncedValues = useDebounce(values, 500)
    const prevValues = useRef(debouncedValues)

    useEffect(() => {
        if (JSON.stringify(prevValues.current) !== JSON.stringify(debouncedValues)) {
            onSave(debouncedValues)
            prevValues.current = debouncedValues
        }
    }, [debouncedValues, onSave])

    return (
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={2}>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="firstName">
                    First Name
                </FormLabel>
                <Input
                    id="firstName"
                    onChange={handleChange}
                    defaultValue={values.firstName}
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                />
            </FormControl>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="lastName">
                    Last Name
                </FormLabel>
                <Input
                    id="lastName"
                    onChange={handleChange}
                    defaultValue={values.lastName}
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                />
            </FormControl>

            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="email">
                    Email
                </FormLabel>
                <Input
                    id="email"
                    onChange={handleChange}
                    defaultValue={values.email}
                    type="email"
                    name="email"
                    placeholder="Email"
                />
            </FormControl>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="phoneNumber">
                    Phone Number
                </FormLabel>
                <Input
                    id="phoneNumber"
                    onChange={handleChange}
                    defaultValue={values.phoneNumber}
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                />
            </FormControl>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="address">
                    Address
                </FormLabel>
                <Input
                    id="address"
                    onChange={handleChange}
                    defaultValue={values.address}
                    type="text"
                    name="address"
                    placeholder="Address"
                />
            </FormControl>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="linkedin">
                    LinkedIn
                </FormLabel>
                <Input
                    onChange={handleChange}
                    defaultValue={values.linkedin}
                    type="text"
                    name="linkedin"
                    placeholder="LinkedIn"
                />
            </FormControl>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="description">
                    Description
                </FormLabel>
                <Textarea
                    onChange={handleChange}
                    defaultValue={values.description}
                    name="description"
                    placeholder="Description"
                />
            </FormControl>
        </Grid>
    )
}

export const ExperienceInput = ({ onSave }) => {
    const { values, handleChange, setValues } = useFormikContext()
    const debouncedValues = useDebounce(values, 500)
    const prevValues = useRef(debouncedValues)

    useEffect(() => {
        if (JSON.stringify(prevValues.current) !== JSON.stringify(debouncedValues)) {
            onSave(debouncedValues)
            prevValues.current = debouncedValues
        }
    }, [debouncedValues, onSave])

    const hanldeAddExperience = () => {
        const newExperience = {
            title: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            description: ''
        }
        setValues({
            ...values,
            experiences: [...values.experiences, newExperience]
        })
    }

    const handleRemoveExperience = () => {
        setValues({
            ...values,
            experiences: values.experiences.filter((_, index) => index !== values.experiences.length - 1)
        })
    }

    return (
        <VStack gap={8} w="full">
            {values.experiences &&
                values.experiences.length > 0 &&
                values.experiences.map((exp, index) => (
                    <Fragment key={index}>
                        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={2} w="full">
                            <FormControl>
                                <FormLabel color="text.secondary" fontSize="xs" htmlFor="title">
                                    Title
                                </FormLabel>
                                <Input
                                    id="title"
                                    type="text"
                                    onChange={handleChange}
                                    name={`experiences.${index}.title`}
                                    placeholder="Title"
                                    defaultValue={exp.title}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel color="text.secondary" fontSize="xs" htmlFor="company">
                                    Company
                                </FormLabel>
                                <Input
                                    id="company"
                                    defaultValue={exp.company}
                                    onChange={handleChange}
                                    type="text"
                                    name={`experiences.${index}.company`}
                                    placeholder="Company"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel color="text.secondary" fontSize="xs" htmlFor="location">
                                    Location
                                </FormLabel>
                                <Input
                                    id="location"
                                    onChange={handleChange}
                                    defaultValue={exp.location}
                                    type="text"
                                    name={`experiences.${index}.location`}
                                    placeholder="Location"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel color="text.secondary" fontSize="xs" htmlFor="startDate">
                                    Start Date
                                </FormLabel>
                                <Input
                                    id="startDate"
                                    onChange={handleChange}
                                    defaultValue={exp.startDate}
                                    type="date"
                                    name={`experiences.${index}.startDate`}
                                    placeholder="Start Date"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel color="text.secondary" fontSize="xs" htmlFor="endDate">
                                    End Date
                                </FormLabel>
                                <Input
                                    id="endDate"
                                    onChange={handleChange}
                                    defaultValue={exp.endDate}
                                    type="date"
                                    name={`experiences.${index}.endDate`}
                                    placeholder="End Date"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel color="text.secondary" fontSize="xs" htmlFor="description">
                                    Description
                                </FormLabel>
                                <Textarea
                                    id="description"
                                    onChange={handleChange}
                                    defaultValue={exp.description}
                                    name={`experiences.${index}.description`}
                                    placeholder="Description"
                                />
                            </FormControl>
                        </Grid>
                        <AddMoreButton
                            onAdd={hanldeAddExperience}
                            onRemove={index === values.experiences.length - 1 ? undefined : handleRemoveExperience}
                        />
                    </Fragment>
                ))}
        </VStack>
    )
}

export const SkillsInput = ({ onSave }) => {
    const { values, setValues, handleChange } = useFormikContext()
    const debouncedValues = useDebounce(values, 500)
    const prevValues = useRef(debouncedValues)

    useEffect(() => {
        if (JSON.stringify(prevValues.current) !== JSON.stringify(debouncedValues)) {
            onSave(debouncedValues)
            prevValues.current = debouncedValues
        }
    }, [debouncedValues, onSave])

    const handleAddSkill = () => {
        const newSkill = {
            name: '',
            score: 0
        }
        setValues({
            ...values,
            skills: [...values.skills, newSkill]
        })
    }

    const handleRemoveSkill = () => {
        setValues({
            ...values,
            skills: values.skills.filter((_, index) => index !== values.skills.length - 1)
        })
    }

    return (
        <>
            {values.skills?.map((skill, index) => (
                <>
                    <Grid key={index} templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={2} mb={4}>
                        <FormControl>
                            <FormLabel color="text.secondary" fontSize="xs" htmlFor="name">
                                Name
                            </FormLabel>
                            <Input
                                id="name"
                                onChange={handleChange}
                                defaultValue={skill.name}
                                type="text"
                                name={`skills.${index}.name`}
                                placeholder="Name"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel color="text.secondary" fontSize="xs" htmlFor="score">
                                Score
                            </FormLabel>
                            <Input
                                id="score"
                                onChange={handleChange}
                                defaultValue={skill.score}
                                type="number"
                                name={`skills.${index}.score`}
                                placeholder="Score"
                            />
                        </FormControl>
                    </Grid>
                    <AddMoreButton
                        onAdd={handleAddSkill}
                        onRemove={index === values.skills.length - 1 ? undefined : handleRemoveSkill}
                    />
                </>
            ))}
        </>
    )
}

export const EducationInput = ({ onSave }) => {
    const { values, setValues, handleChange } = useFormikContext()
    const debouncedValues = useDebounce(values, 500)
    const prevValues = useRef(debouncedValues)

    useEffect(() => {
        if (JSON.stringify(prevValues.current) !== JSON.stringify(debouncedValues)) {
            onSave(debouncedValues)
            prevValues.current = debouncedValues
        }
    }, [debouncedValues, onSave])

    const handleAddEducation = () => {
        const newEducation = {
            degree: '',
            major: '',
            university: '',
            school: '',
            location: ''
        }
        setValues({
            ...values,
            education: [...values.education, newEducation]
        })
    }

    return (
        <>
            {values.education?.map((edu, index) => (
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={2} key={index} mb={4}>
                    <FormControl>
                        <FormLabel color="text.secondary" fontSize="xs" htmlFor="degree">
                            Degree
                        </FormLabel>
                        <Input
                            id="degree"
                            onChange={handleChange}
                            defaultValue={edu.degree}
                            type="text"
                            name={`education.${index}.degree`}
                            placeholder="Degree"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel color="text.secondary" fontSize="xs" htmlFor="major">
                            Major
                        </FormLabel>
                        <Input
                            id="major"
                            onChange={handleChange}
                            defaultValue={edu.major}
                            type="text"
                            name={`education.${index}.major`}
                            placeholder="Major"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel color="text.secondary" fontSize="xs" htmlFor="university">
                            University
                        </FormLabel>
                        <Input
                            id="university"
                            onChange={handleChange}
                            defaultValue={edu.university}
                            type="text"
                            name={`education.${index}.university`}
                            placeholder="University"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel color="text.secondary" fontSize="xs" htmlFor="school">
                            School
                        </FormLabel>
                        <Input
                            id="school"
                            onChange={handleChange}
                            defaultValue={edu.school}
                            type="text"
                            name={`education.${index}.school`}
                            placeholder="School"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel color="text.secondary" fontSize="xs" htmlFor="location">
                            Location
                        </FormLabel>
                        <Input
                            id="location"
                            onChange={handleChange}
                            defaultValue={edu.location}
                            type="text"
                            name={`education.${index}.location`}
                            placeholder="Location"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel color="text.secondary" fontSize="xs" htmlFor="startDate">
                            Start Date
                        </FormLabel>
                        <Input
                            id="startDate"
                            onChange={handleChange}
                            defaultValue={edu.startDate}
                            type="date"
                            name={`education.${index}.startDate`}
                            placeholder="Start Date"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel color="text.secondary" fontSize="xs" htmlFor="endDate">
                            End Date
                        </FormLabel>
                        <Input
                            id="endDate"
                            onChange={handleChange}
                            defaultValue={edu.endDate}
                            type="date"
                            name={`education.${index}.endDate`}
                            placeholder="End Date"
                        />
                    </FormControl>
                </Grid>
            ))}
            <AddMoreButton onAdd={handleAddEducation} />
        </>
    )
}

export const CertificationsInput = ({ onSave }) => {
    const { values, setValues, handleChange } = useFormikContext()
    const debouncedValues = useDebounce(values, 500)
    const prevValues = useRef(debouncedValues)

    useEffect(() => {
        if (JSON.stringify(prevValues.current) !== JSON.stringify(debouncedValues)) {
            onSave(debouncedValues)
            prevValues.current = debouncedValues
        }
    }, [debouncedValues, onSave])

    const handleAddCertification = () => {
        const newCertification = {
            name: '',
            date: ''
        }
        setValues({
            ...values,
            certifications: [...values.certifications, newCertification]
        })
    }

    return (
        <>
            {values.certifications?.map((cert, index) => (
                <Grid key={index} templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={2} mb={4}>
                    <FormControl>
                        <FormLabel color="text.secondary" fontSize="xs" htmlFor="name">
                            Name
                        </FormLabel>
                        <Input
                            onChange={handleChange}
                            defaultValue={cert.name}
                            type="text"
                            name={`certifications.${index}.name`}
                            placeholder="Name"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel color="text.secondary" fontSize="xs" htmlFor="date">
                            Date
                        </FormLabel>
                        <Input
                            onChange={handleChange}
                            defaultValue={cert.date}
                            type="date"
                            name={`certifications.${index}.date`}
                            placeholder="Date"
                        />
                    </FormControl>
                </Grid>
            ))}
            <AddMoreButton onAdd={handleAddCertification} />
        </>
    )
}
