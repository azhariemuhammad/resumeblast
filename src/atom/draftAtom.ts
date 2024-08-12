import { atom } from 'jotai'
import { Resume } from '../types'

export const draftAtom = atom<Resume>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    experiences: [],
    education: [],
    certifications: [],
    description: '',
    references: [],
    linkedin: '',
    skills: []
})
