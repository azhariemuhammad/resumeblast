import { Button, Flex, Stack } from '@chakra-ui/react'
import { EditorLayout } from '../components/EditorLayout'
import { Header } from '../components/Header'

export const Editor = () => {
    return (
        <Stack>
            <Header />
            <EditorLayout />
        </Stack>
    )
}
