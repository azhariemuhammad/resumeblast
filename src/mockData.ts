import { Resume } from './types'

export const mock: Resume = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
    phoneNumber: '+1 (555) 555-5555',
    address: '123 Main St, Anytown, USA',
    experiences: [
        {
            title: 'Software Engineer',
            description:
                'John Doe is a software engineer with 10 years of experience in developing web applications using various programming languages and frameworks. He has a strong background in object-oriented programming and has experience with various database technologies such as MySQL, MongoDB, and PostgreSQL. John is also a certified ScrumMaster and has worked as a ScrumMaster for several teams in the past.',
            company: 'Google',
            location: 'San Francisco, CA',
            startDate: '2020-01-01',
            endDate: '2021-01-01'
        },
        {
            title: 'Software Engineer',
            description:
                'John Doe is a software engineer with 10 years of experience in developing web applications using various programming languages and frameworks. He has a strong background in object-oriented programming and has experience with various database technologies such as MySQL, MongoDB, and PostgreSQL. John is also a certified ScrumMaster and has worked as a ScrumMaster for several teams in the past.',
            company: 'Apple',
            location: 'San Francisco, CA',
            startDate: '2019-01-01',
            endDate: '2020-01-01'
        }
    ],
    education: [
        {
            degree: 'Bachelor of Science',
            major: 'Computer Science',
            university: 'University of California, Berkeley',
            school: 'Berkeley',
            location: 'Berkeley, CA',
            startDate: '2018-01-01',
            endDate: '2021-01-01',
            description: 'Bachelor of Science in Computer Science from University of California, Berkeley.'
        }
    ],
    certifications: [
        {
            name: 'Certified ScrumMaster',
            date: '2021-01-01'
        }
    ],
    description:
        'John Doe is a software engineer with 10 years of experience in developing web applications using various programming languages and frameworks. He has a strong background in object-oriented programming and has experience with various database technologies such as MySQL, MongoDB, and PostgreSQL. John is also a certified ScrumMaster and has worked as a ScrumMaster for several teams in the past.',
    references: ['John Doe', 'Jane Doe'],
    linkedin: 'https://www.linkedin.com/in/johndoe',
    skills: [
        {
            name: 'JavaScript',
            score: 8
        },
        {
            name: 'React',
            score: 9
        },
        {
            name: 'Node.js',
            score: 7
        }
    ],
    title: 'Senior Software Engineer'
}
