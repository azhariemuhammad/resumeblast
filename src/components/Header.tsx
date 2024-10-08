import {
    Box,
    Button,
    Flex,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    Avatar as ChakraAvatar
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../services/useAuth'
import { useAtom } from 'jotai'
import { userAtom } from '../atom/userAtom'
import { AuthWrapper } from './AuthWrapper'
import { ChevronDownIcon } from '@chakra-ui/icons'

type AvatarProps = {
    name: string
    size?: string
    showName?: boolean
    bgColor?: string
}

const Avatar = ({ name, size = 'md', showName = false, bgColor = 'gray.50' }: AvatarProps) => {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <Flex alignItems="center">
            <ChakraAvatar name={name} size={size} color="text.secondary" bg={bgColor} getInitials={getInitials} />
            {showName && (
                <Box ml={2}>
                    <Text fontWeight="medium" color="text.secondary" fontSize="sm">
                        {name}
                    </Text>
                </Box>
            )}
        </Flex>
    )
}

export const Header = () => {
    const navigate = useNavigate()
    const { session, signOut } = useAuth()
    const isLoggedIn = session !== null
    const [user] = useAtom(userAtom)
    const name = user?.name ?? ''
    const agencyName = user?.agency_name ?? ''

    return (
        <Flex
            minH="64px"
            w="full"
            h="full"
            top={0}
            bg="white"
            zIndex={20}
            mb={10}
            px={4}
            pos="sticky"
            boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;"
            alignItems="center"
            justifyContent="space-between"
        >
            <Box borderRadius="full" bg="primary.500" w="40px" h="40px" mr={4}>
                <Link
                    onClick={() => navigate('/')}
                    _hover={{ textDecoration: 'none' }}
                    fontSize="xl"
                    fontWeight="bold"
                    textAlign="center"
                    as="h1"
                    color="white"
                    py="4px"
                >
                    RB
                </Link>
            </Box>
            <Box>
                {isLoggedIn ? (
                    <Menu>
                        <MenuButton as={Button} variant="outline" rightIcon={<ChevronDownIcon />}>
                            <Avatar name={name} size="sm" showName />
                        </MenuButton>
                        <MenuList fontSize="sm" p={0}>
                            <Text
                                bg="whitesmoke"
                                fontWeight="medium"
                                p={4}
                                textStyle="uppercase"
                                color="secondary.800"
                                fontSize="md"
                            >
                                {agencyName}
                            </Text>

                            <MenuItem onClick={() => navigate('/collections')}>Collections</MenuItem>
                            <MenuItem onClick={signOut}>Sign Out</MenuItem>
                        </MenuList>
                    </Menu>
                ) : (
                    <AuthWrapper>
                        <Button size="sm">Sign In</Button>
                    </AuthWrapper>
                )}
            </Box>
        </Flex>
    )
}
