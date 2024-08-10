import { atom } from 'jotai'
import { Resume } from '../types'
import { mock } from '../mockData'

export const draftAtom = atom<Resume>(mock)
