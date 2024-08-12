import {
    Card,
    CardBody,
    Box,
    MenuList,
    MenuItem,
    MenuButton,
    Heading,
    IconButton,
    Image,
    Text,
    Menu,
    Flex
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { CalendarIcon } from '@chakra-ui/icons'

type IssueCardProps = {
    title: string
    imageUri: string
    issueDate: string
    issueNumber: number
    onOpenEditor: () => void
    onDeleteIssue: () => void
}

const ThreeDotsVertical = () => {
    return (
        <svg
            stroke="white"
            fill="white"
            strokeWidth="0"
            viewBox="0 0 16 16"
            aria-hidden="true"
            focusable="false"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
        </svg>
    )
}

export const CVCard = ({ title, imageUri, issueDate, issueNumber, onOpenEditor, onDeleteIssue }: IssueCardProps) => {
    return (
        <Card
            w="full"
            boxShadow="0px 3px 12px rgba(0, 0, 0, 0.09)"
            transition="all 0.3s ease-in-out"
            _hover={{
                transform: 'scale(1.03)',
                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)'
            }}
        >
            <Box position="relative">
                <Menu isLazy placement="bottom-end">
                    <MenuButton
                        position="absolute"
                        right={0}
                        as={IconButton}
                        aria-label="Options"
                        variant={'ghost'}
                        _hover={{ bg: 'transparent' }}
                        icon={<ThreeDotsVertical />}
                    ></MenuButton>
                    <MenuList>
                        <MenuItem onClick={onOpenEditor}>Edit</MenuItem>
                        <MenuItem onClick={onDeleteIssue}>Delete</MenuItem>
                    </MenuList>
                </Menu>
                <Image
                    fallback={<Image src="https://via.placeholder.com/300x300" w="full" alt="Issue Image" />}
                    src={imageUri}
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                    w="full"
                    objectFit="cover"
                    borderBottomLeftRadius={0}
                    borderBottomRightRadius={0}
                />
            </Box>
            <CardBody p={2}>
                <Heading size="sm" color="notion.700" mb={2}>
                    {title}
                </Heading>
                <Flex gap={2} fontWeight="medium" color="notion.400" justifyContent="space-between" fontSize="sm">
                    <Text>Issue: {issueNumber}</Text>
                    <Flex gap={2} alignItems="center">
                        <CalendarIcon />
                        <Text>{format(new Date(issueDate), 'MMM yyyy')}</Text>
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
    )
}
