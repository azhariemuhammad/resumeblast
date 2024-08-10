import { atom } from 'jotai'

export const layoutAtom = atom<{ component: React.ReactNode; title: string }[]>([
    {
        component: null,
        title: 'Personal Info'
    }
])
