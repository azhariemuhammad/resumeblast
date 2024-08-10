import { Box, FormControl, FormLabel, Grid, Input, Textarea } from '@chakra-ui/react'
import { Resume } from '../types'
import exp from 'constants'

export const PersonalInfoInput = () => {
    return (
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="firstName">
                    First Name
                </FormLabel>
                <Input type="text" name="firstName" placeholder="First Name" />
            </FormControl>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="lastName">
                    Last Name
                </FormLabel>
                <Input type="text" name="lastName" placeholder="Last Name" />
            </FormControl>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="email">
                    Email
                </FormLabel>
                <Input type="email" name="email" placeholder="Email" />
            </FormControl>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="phoneNumber">
                    Phone Number
                </FormLabel>
                <Input type="tel" name="phoneNumber" placeholder="Phone Number" />
            </FormControl>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="address">
                    Address
                </FormLabel>
                <Input type="text" name="address" placeholder="Address" />
            </FormControl>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="linkedin">
                    LinkedIn
                </FormLabel>
                <Input type="text" name="linkedin" placeholder="LinkedIn" />
            </FormControl>
        </Grid>
    )
}

export const ExperienceInput = () => {
    return (
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="title">
                    Title
                </FormLabel>
                <Input type="text" name="title" placeholder="Title" />
            </FormControl>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="company">
                    Company
                </FormLabel>
                <Input type="text" name="company" placeholder="Company" />
            </FormControl>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="location">
                    Location
                </FormLabel>
                <Input type="text" name="location" placeholder="Location" />
            </FormControl>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="startDate">
                    Start Date
                </FormLabel>
                <Input type="date" name="startDate" placeholder="Start Date" />
            </FormControl>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="endDate">
                    End Date
                </FormLabel>
                <Input type="date" name="endDate" placeholder="End Date" />
            </FormControl>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="description">
                    Description
                </FormLabel>
                <Textarea name="description" placeholder="Description" />
            </FormControl>
        </Grid>
    )
}

export const SkillsInput = () => {
    return (
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="name">
                    Name
                </FormLabel>
                <Input type="text" name="name" placeholder="Name" />
            </FormControl>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="score">
                    Score
                </FormLabel>
                <Input type="number" name="score" placeholder="Score" />
            </FormControl>
        </Grid>
    )
}

export const EducationInput = () => {
    return (
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="degree">
                    Degree
                </FormLabel>
                <Input type="text" name="degree" placeholder="Degree" />
            </FormControl>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="major">
                    Major
                </FormLabel>
                <Input type="text" name="major" placeholder="Major" />
            </FormControl>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="university">
                    University
                </FormLabel>
                <Input type="text" name="university" placeholder="University" />
            </FormControl>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="school">
                    School
                </FormLabel>
                <Input type="text" name="school" placeholder="School" />
            </FormControl>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="location">
                    Location
                </FormLabel>
                <Input type="text" name="location" placeholder="Location" />
            </FormControl>
        </Grid>
    )
}

export const CertificationsInput = () => {
    return (
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="name">
                    Name
                </FormLabel>
                <Input type="text" name="name" placeholder="Name" />
            </FormControl>
            <FormControl>
                <FormLabel color="text.secondary" fontSize="xs" htmlFor="date">
                    Date
                </FormLabel>
                <Input type="date" name="date" placeholder="Date" />
            </FormControl>
        </Grid>
    )
}
