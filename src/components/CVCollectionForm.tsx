import { useAtom } from 'jotai'
import { useAuth } from '../services/useAuth'
import { Form } from 'react-router-dom'
import { Center, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { userAtom } from '../atom/userAtom'
import { useRef } from 'react'

export const CVCollectionForm = () => {
    const [user] = useAtom(userAtom)
    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formRef.current) {
            formRef.current.reset()
        }
    }
    return (
        <Center>
            <form onSubmit={handleSubmit} ref={formRef}>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input type="text" color="text.secondary" placeholder="Enter name" name="name" />
                </FormControl>
                <FormControl>
                    <FormLabel>Agency Name</FormLabel>
                    <Input type="text" color="text.secondary" placeholder="Enter name" name="agencyName" />
                </FormControl>
            </form>
        </Center>
    )
}
