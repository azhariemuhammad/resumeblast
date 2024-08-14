import {
    Button,
    Center,
    Container,
    Heading,
    Stack,
    Text,
    Grid,
    GridItem,
    Card,
    CardBody,
    Image,
    Box,
    Flex
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'

export const Home = () => {
    const resumePhotos = [
        'http://localhost:3000/resume-image/template-1.png',
        'http://localhost:3000/resume-image/template-2.png',
        'http://localhost:3000/resume-image/template-2.png'
    ]

    return (
        <>
            <Header />
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 4px' }}>
                <Container my={16}>
                    <Center>
                        <Stack spacing={4} align="center">
                            <Heading textAlign="center">Resume Blast</Heading>
                            <Text textAlign="center" as="h2" fontSize="xl" variant="secondary">
                                Create Professional Resumes in Minutes
                            </Text>
                            <Button
                                onClick={() => (window.location.href = '/editor?newtemplate=true')}
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
                                onClick={() => (window.location.href = '/editor?isCandidateForm=true')}
                                colorScheme="primary"
                                variant="outline"
                                size="md"
                            >
                                Input candidate info
                            </Button>
                        </Stack>
                    </Center>
                </Container>
                <Grid
                    templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
                    gap={6}
                    w="full"
                >
                    {resumePhotos.map((item, index) => (
                        <GridItem w="full" h={{ sm: 'auto', md: 'auto' }} key={index}>
                            <Card
                                p="0"
                                boxShadow="0px 3px 12px rgba(0, 0, 0, 0.09)"
                                transition="all 0.3s ease-in-out"
                                _hover={{
                                    transform: 'scale(1.03)',
                                    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)'
                                }}
                                bg="whitesmoke"
                                padding={4}
                            >
                                <CardBody p="0" bg="white">
                                    <Box maxH="500px" h="500px" w="100%" overflow="hidden">
                                        <Image
                                            alt="Cv Image"
                                            src={item}
                                            objectFit="contain"
                                            maxW="100%"
                                            maxH="100%"
                                            w="100%"
                                        />
                                    </Box>
                                </CardBody>
                            </Card>
                        </GridItem>
                    ))}
                </Grid>
            </div>
        </>
    )
}
