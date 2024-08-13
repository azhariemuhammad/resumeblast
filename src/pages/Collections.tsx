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
import { userAtom } from '../atom/userAtom'
import { useResumeService } from '../services/useResumeService'
import { useQuery } from '@tanstack/react-query'
import { AuthModal } from '../components/AuthWrapper'
import { useAuth } from '../services/useAuth'
import { ResumeData } from '../types'

type CollectionsProps = {
    isCandidateForm?: boolean
    onClick?: (resume: Resume) => void
}

export const Collections = ({ isCandidateForm, onClick = () => {} }: CollectionsProps) => {
    const toast = useToast()

    const { getAllTemplates } = useResumeService()
    const [user] = useAtom(userAtom)
    const userId = user?.id ?? ''
    const { session } = useAuth()
    const showAuth = useDisclosure({ defaultIsOpen: user === null || session === null })

    const { data } = useQuery({
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
        <Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} w="full">
            {data?.map((resume: ResumeData) => (
                <GridItem w="full" h={{ sm: 'auto', md: 'auto' }} key={resume.id}>
                    <Card p="0">
                        <CardHeader>Template: {resume.layout_name}</CardHeader>
                        <CardBody p="0">
                            <Image alt="Cv Image" src="https://placehold.co/400" w="full" objectFit="cover" />
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
                <Heading m={4} fontSize="xl">
                    CV Templates
                </Heading>
                <Flex justifyContent="center" alignItems="center" flexDirection="column" gap={6}>
                    {renderGridView()}
                </Flex>
            </Container>
        </>
    )
}
