import {
    Container,
    Flex,
    Grid,
    Skeleton,
    GridItem,
    useDisclosure,
    Box,
    useToast,
    Card,
    Image,
    CardBody,
    CardFooter,
    Button,
    Heading,
    Text,
    AspectRatio
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { userAtom } from '../atom/userAtom'
import { useResumeService } from '../services/useResumeService'
import { useQuery } from '@tanstack/react-query'
import { AuthModal } from '../components/AuthWrapper'
import { useAuth } from '../services/useAuth'
import { ResumeData } from '../types'
import { Header } from '../components/Header'
import { ArrowForwardIcon } from '@chakra-ui/icons'

type CollectionsProps = {
    title?: string
    isCandidateForm?: boolean
    onClick?: (resume: ResumeData) => void
    showCreateButton?: boolean
}

const LoaderGrid = () => {
    return (
        <Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6} w="full">
            {Array.from({ length: 20 }).map((_, i) => (
                <GridItem key={i} w="full" h={{ sm: 'auto', md: 'auto' }}>
                    <Skeleton key={i} minH="400px" w="100%" />
                </GridItem>
            ))}
        </Grid>
    )
}

export const Collections = ({ isCandidateForm, title, showCreateButton, onClick = () => {} }: CollectionsProps) => {
    const toast = useToast()

    const { getAllTemplates } = useResumeService()
    const [user] = useAtom(userAtom)
    const userId = user?.id ?? ''
    const { session } = useAuth()
    const showAuth = useDisclosure({ defaultIsOpen: user === null || session === null })

    const { data, isLoading } = useQuery({
        queryKey: ['collections'],
        enabled: Boolean(userId),
        queryFn: () =>
            getAllTemplates(userId)
                .then(res => {
                    if (!res?.length) return

                    return res
                })
                .catch(err => {
                    console.error(err)
                    toast({
                        title: 'An error occurred.',
                        description: err?.message ?? 'Please try again.',
                        status: 'error',
                        duration: 3000,
                        isClosable: true
                    })
                })
    })

    if (user === null || session === null) {
        return <AuthModal showAuth={showAuth.isOpen} onClose={() => window.location.reload()} />
    }

    const renderGridView = () => (
        <Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6} w="full">
            {data?.map((resume: ResumeData) => (
                <GridItem w="full" h={{ sm: 'auto', md: 'auto' }} key={resume.id}>
                    <Card
                        p="0"
                        boxShadow="0px 3px 12px rgba(0, 0, 0, 0.09)"
                        transition="all 0.3s ease-in-out"
                        _hover={{
                            transform: 'scale(1.03)',
                            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer'
                        }}
                    >
                        <CardBody p="0">
                            <AspectRatio ratio={1 / 1}>
                                <Image alt="Cv Image" src={resume.image} objectFit="contain" height="700px" />
                            </AspectRatio>
                            <Text fontSize="md" p={2} fontWeight="500" color="text.secondary">
                                {resume.layout_name}
                            </Text>
                        </CardBody>
                        <CardFooter justifyContent="flex-end" p={2}>
                            <Button variant="outline" colorScheme="primary" onClick={() => onClick(resume)} size="sm">
                                {!isCandidateForm ? 'Edit' : 'Generate'}
                            </Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            ))}
        </Grid>
    )

    return (
        <>
            <Container maxW="container.xl" padding="2">
                <Flex justifyContent="space-between" alignItems="center" mb={4}>
                    <Heading mb={8} fontSize="xl">
                        {title ?? 'CV Templates'}
                    </Heading>
                    {showCreateButton && (
                        <Flex gap={2}>
                            <Button
                                onClick={() => (window.location.href = '/editor?isCandidateForm=true')}
                                colorScheme="primary"
                                variant="outline"
                                size="sm"
                            >
                                Input candidate info
                            </Button>
                            <Button
                                onClick={() => (window.location.href = '/editor?newtemplate=true')}
                                colorScheme="primary"
                                variant="solid"
                                size="sm"
                                rightIcon={<ArrowForwardIcon />}
                            >
                                Create template
                            </Button>
                        </Flex>
                    )}
                </Flex>

                <Flex justifyContent="center" alignItems="center" flexDirection="column" gap={6}>
                    {isLoading ? <LoaderGrid /> : renderGridView()}
                </Flex>
            </Container>
        </>
    )
}

export const CollectionsPage = () => {
    const onClick = (resume: ResumeData) => {
        window.location.href = `/editor?resumeId=${resume.id}`
    }

    return (
        <>
            <Header />
            <Collections onClick={onClick} showCreateButton />
        </>
    )
}
