import { Box, Button, Center, Container, Heading, Stack, Text } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
    const navigate = useNavigate()

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 4px' }}>
            <Container my={16}>
                <Center>
                    <Stack spacing={4} align="center">
                        <Heading textAlign="center">CV Blast</Heading>
                        <Text textAlign="center" as="h2" fontSize="xl" variant="secondary">
                            Create a beautiful CV in seconds
                        </Text>
                        <Button
                            onClick={() => navigate('/editor')}
                            colorScheme="primary"
                            variant="solid"
                            size="lg"
                            leftIcon={<ArrowForwardIcon />}
                        >
                            Create template
                        </Button>
                    </Stack>
                </Center>
            </Container>
        </div>
    )
}
