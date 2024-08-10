import { Flex, Stack } from '@chakra-ui/react'
import { EditorLayout } from '../components/EditorLayout'

const Controller = () => {
    return (
        <Flex w="full" margin="auto" padding={4} mb={8} boxShadow="md" borderRadius="md" bg="white">
            <div>Controller</div>
        </Flex>
    )
}
export const Editor = () => {
    return (
        <Stack>
            <Controller />
            <EditorLayout />
        </Stack>
    )
}
