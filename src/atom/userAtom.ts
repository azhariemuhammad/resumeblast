import { atomWithStorage } from 'jotai/utils'

export type User = {
    id: string
    name: string
    agency_name: string
    email: string
    created_at: string
    updated_at: string
}

export const userAtom = atomWithStorage<User>('user', {} as User)
