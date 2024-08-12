import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
    const navigate = useNavigate()
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
            <Box>
                <Link
                    onClick={() => navigate('/')}
                    _hover={{ textDecoration: 'none' }}
                    color="primary.500"
                    fontSize="xl"
                    fontWeight="bold"
                    textAlign="center"
                    as="h1"
                >
                    CV Blast
                </Link>
            </Box>
            <Box>
                <Button
                    size="sm"
                    rightIcon={<Box />}
                    onClick={() => window.open('https://github.com/anubra266/cv-blast', '_blank')}
                >
                    Login
                </Button>
            </Box>
        </Flex>
    )
}
