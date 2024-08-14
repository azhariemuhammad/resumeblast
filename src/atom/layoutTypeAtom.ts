import { atom } from 'jotai'

export const layoutTypeAtom = atom<'two-column' | 'one-column'>('one-column')
