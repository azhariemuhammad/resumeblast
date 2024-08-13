import {
    Container,
    Flex,
    Grid,
    GridItem,
    useDisclosure,
    useToast,
    Card,
    Image,
    CardBody,
    CardHeader,
    CardFooter,
    Button,
    Heading
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { userAtom } from '../atom/userAtom'
import { useResumeService } from '../services/useResumeService'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { AuthModal } from '../components/AuthWrapper'
import { useAuth } from '../services/useAuth'

type ViewSwitchProps = {
    isGrid: boolean
    onToggle: () => void
}

type IssueListProps = {
    refetch: () => void
    isLoading: boolean
}

export const Collections = () => {
    const toast = useToast()
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { getAllResumes } = useResumeService()
    const [user] = useAtom(userAtom)
    const navigate = useNavigate()
    const userId = user?.id ?? ''
    const { session } = useAuth()
    const showAuth = useDisclosure({ defaultIsOpen: user === null || session === null })

    const { data, isLoading } = useQuery({
        queryKey: ['collections'],
        enabled: Boolean(userId),
        queryFn: () =>
            getAllResumes(userId)
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

    const handleOpenEditor = (id: string) => {
        window.open(`/editor?resumeId=${id}`, '_blank')
    }

    if (user === null || session === null) {
        return <AuthModal showAuth={showAuth.isOpen} onClose={() => window.location.reload()} />
    }

    const renderGridView = () => (
        <Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} w="full">
            {data?.map(resume => (
                <GridItem w="full" h={{ sm: 'auto', md: 'auto' }} key={resume.id}>
                    <Card p="0">
                        <CardHeader>CV: {resume.data.firstName}</CardHeader>
                        <CardBody p="0">
                            <Image alt="Cv Image" src="https://placehold.co/400" w="full" objectFit="cover" />
                        </CardBody>
                        <CardFooter justifyContent="flex-end" p={2}>
                            <Button
                                variant="outline"
                                colorScheme="primary"
                                onClick={() => handleOpenEditor(resume.id)}
                                size="sm"
                            >
                                Edit
                            </Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            ))}
        </Grid>
    )

    return (
        <>
            <Header />
            <Container maxW="container.xl" padding="2">
                <Heading m={4} fontSize="xl">
                    My Collections
                </Heading>
                <Flex justifyContent="center" alignItems="center" flexDirection="column" gap={6}>
                    {renderGridView()}
                </Flex>
            </Container>
        </>
    )
}
