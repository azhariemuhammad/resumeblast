import { FormControl, FormLabel, Grid, Input, Textarea, VStack } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { useDebounce } from '../hooks/useDebounce'
import { useEffect } from 'react'

export const PersonalInfoInput = ({ onSave }) => {
    const { values, submitForm, handleChange } = useFormikContext()

    const debouncedValues = useDebounce(values, 500)

    useEffect(() => {
        onSave(debouncedValues)
    }, [debouncedValues])

    return (
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="firstName">
                    First Name
                </FormLabel>
                <Input
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
    const { values, handleChange } = useFormikContext()
    const debouncedValues = useDebounce(values, 500)
    console.log('experiences', values.experiences)

    useEffect(() => {
        onSave(debouncedValues)
    }, [debouncedValues])

    return (
        <VStack gap={8} w="full">
            {values.experiences &&
                values.experiences.length > 0 &&
                values.experiences.map((exp, index) => (
                    <Grid templateColumns="repeat(2, 1fr)" gap={2} w="full" key={index}>
                        <FormControl>
                            <FormLabel color="text.secondary" fontSize="xs" htmlFor="title">
                                Title
                            </FormLabel>
                            <Input
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
                                onChange={handleChange}
                                defaultValue={exp.description}
                                name={`experiences.${index}.description`}
                                placeholder="Description"
                            />
                        </FormControl>
                    </Grid>
                ))}
        </VStack>
    )
}

export const SkillsInput = ({ onSave }) => {
    const { values, handleChange } = useFormikContext()
    const debouncedValues = useDebounce(values, 500)

    useEffect(() => {
        onSave(debouncedValues)
    }, [debouncedValues])

    return (
        <>
            {values.skills?.map((skill, index) => (
                <Grid key={index} templateColumns="repeat(2, 1fr)" gap={2}>
                    <FormControl>
                        <FormLabel color="text.secondary" fontSize="xs" htmlFor="name">
                            Name
                        </FormLabel>
                        <Input
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
                            onChange={handleChange}
                            defaultValue={skill.score}
                            type="number"
                            name={`skills.${index}.score`}
                            placeholder="Score"
                        />
                    </FormControl>
                </Grid>
            ))}
        </>
    )
}

export const EducationInput = ({ onSave }) => {
    const { values, handleChange } = useFormikContext()
    const debouncedValues = useDebounce(values, 500)

    useEffect(() => {
        onSave(debouncedValues)
    }, [debouncedValues])

    return (
        <>
            {values.education?.map((edu, index) => (
                <Grid templateColumns="repeat(2, 1fr)" gap={2} key={index}>
                    <FormControl>
                        <FormLabel color="text.secondary" fontSize="xs" htmlFor="degree">
                            Degree
                        </FormLabel>
                        <Input
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
                            onChange={handleChange}
                            defaultValue={edu.location}
                            type="text"
                            name={`education.${index}.location`}
                            placeholder="Location"
                        />
                    </FormControl>
                </Grid>
            ))}
        </>
    )
}

export const CertificationsInput = ({ onSave }) => {
    const { values, handleChange } = useFormikContext()
    const debouncedValues = useDebounce(values, 500)

    useEffect(() => {
        onSave(debouncedValues)
    }, [debouncedValues])
    return (
        <>
            {values.certifications?.map((cert, index) => (
                <Grid key={index} templateColumns="repeat(2, 1fr)" gap={2}>
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
        </>
    )
}
