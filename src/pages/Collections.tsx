import { Container, Flex, Box, Grid, GridItem, useDisclosure } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { userAtom } from '../atom/userAtom'
import { CVCollectionForm } from '../components/CVCollectionForm'

type ViewSwitchProps = {
    isGrid: boolean
    onToggle: () => void
}

type IssueListProps = {
    refetch: () => void
    isLoading: boolean
}

export const Collections = ({ issues, refetch, isLoading }: IssueListProps) => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [user, setUser] = useAtom(userAtom)

    const handleOpenEditor = (id: string) => {
        // onOpen()
    }

    const handleDeleteIssue = (id: string) => {}

    const onSuccessUpdateIssue = () => {}

    if (user !== null && Object.keys(user).length === 0) {
        return <CVCollectionForm />
    }

    const renderGridView = () => (
        <Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} w="full">
            <GridItem w="full" h={{ sm: 'auto', md: 'auto' }}>
                heelo
            </GridItem>
        </Grid>
    )

    return (
        <>
            <Container maxW="container.xl" padding="2">
                <Flex justifyContent="center" alignItems="center" flexDirection="column" gap={6}>
                    {renderGridView()}
                </Flex>
            </Container>
        </>
    )
}
