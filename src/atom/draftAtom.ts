import { atom } from 'jotai'
import { Resume } from '../types'
import { mock } from '../mockData'

export const draftAtom = atom<Resume>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    experiences: [{ title: '', company: '', location: '', startDate: '', endDate: '', description: '' }],
    education: [{ degree: '', major: '', university: '', school: '', location: '' }],
    certifications: [{ name: '', date: '' }],
    description: '',
    references: [],
    linkedin: '',
    skills: [{ name: '', score: '' }]
})

// export const draftAtom = atom<Resume>(mock)
