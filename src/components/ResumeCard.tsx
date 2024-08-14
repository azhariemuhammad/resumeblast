import { Button, Card, CardBody, Flex, Image, Box, Text } from '@chakra-ui/react'
import { ResumeData } from '../types'

type ResumeCardProps = {
    resume: ResumeData
    onClick: (resume: ResumeData) => void
    isCandidateForm?: boolean
}
export const ResumeCard = ({ resume, onClick, isCandidateForm }: ResumeCardProps) => {
    return (
        <Card
            p="0"
            boxShadow="0px 3px 12px rgba(0, 0, 0, 0.09)"
            transition="all 0.3s ease-in-out"
            _hover={{
                transform: 'scale(1.03)',
                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer'
            }}
            bg="whitesmoke"
            padding={4}
        >
            <CardBody p="0" bg="white">
                <Box maxH="500px" h="500px" w="100%" overflow="hidden">
                    <Image alt="Cv Image" src={resume.image} objectFit="contain" maxW="100%" maxH="100%" w="100%" />
                </Box>
                <Flex justifyContent="space-between" alignItems="center" p={2}>
                    <Text fontSize="md" p={2} fontWeight="500" color="text.secondary">
                        {resume.layout_name}
                    </Text>
                    <Button variant="outline" colorScheme="primary" onClick={() => onClick(resume)} size="sm">
                        {!isCandidateForm ? 'Edit' : 'Generate'}
                    </Button>
                </Flex>
            </CardBody>
        </Card>
    )
}
