import { Button, Center, Container, Heading, Stack, Text } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'

export const Home = () => {
    const navigate = useNavigate()

    return (
        <>
            <Header />
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 4px' }}>
                <Container my={16}>
                    <Center>
                        <Stack spacing={4} align="center">
                            <Heading textAlign="center">CV Blast</Heading>
                            <Text textAlign="center" as="h2" fontSize="xl" variant="secondary">
                                Create a beautiful CV in seconds
                            </Text>
                            <Button
                                onClick={() => navigate('/editor?newtemplate=true')}
                                colorScheme="primary"
                                variant="solid"
                                size="lg"
                                rightIcon={<ArrowForwardIcon />}
                            >
                                Create template
                            </Button>
                            <Text textAlign="center" as="h2" fontSize="xl" variant="secondary">
                                or
                            </Text>
                            <Button
                                onClick={() => navigate('/editor?isCandidateForm=true')}
                                colorScheme="primary"
                                variant="solid"
                                size="lg"
                                rightIcon={<ArrowForwardIcon />}
                            >
                                Input candidate info
                            </Button>
                        </Stack>
                    </Center>
                </Container>
            </div>
        </>
    )
}
