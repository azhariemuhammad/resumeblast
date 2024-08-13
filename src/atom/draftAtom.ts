import { atom } from 'jotai'
import { Resume } from '../types'

export const baseDraft: Resume = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    experiences: [{ title: '', company: '', location: '', startDate: '', endDate: '', description: '' }],
    education: [
        { major: '', degree: '', university: '', school: '', location: '', startDate: '', endDate: '', description: '' }
    ],
    certifications: [{ name: '', date: '' }],
    description: '',
    references: [],
    linkedin: '',
    skills: [{ name: '', score: 0 }]
}

export const draftAtom = atom<Resume>(baseDraft)
