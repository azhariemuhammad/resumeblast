import React, { useRef, useState } from 'react'
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, Link, useToast } from '@chakra-ui/react'
import { useAuth } from '../services/useAuth'
import { useUserService } from '../services/useUserService'

interface AuthFormProps {
    onSuccess: () => void
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSuccess = () => {} }) => {
    const [isSignUp, setIsSignUp] = useState(false)
    const { signUp, signIn } = useAuth()
    const toast = useToast()
    const formRef = useRef<HTMLFormElement>(null)
    const { createNewUser } = useUserService()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formRef.current) return
        const formData = new FormData(formRef.current)
        const { email, password, name, agency_name } = Object.fromEntries(formData)

        try {
            if (isSignUp) {
                await signUp(String(email), String(password))
                const error = await createNewUser({ name, email, agency_name })
                if (error) {
                    throw new Error(error.message)
                }
            }

            if (!isSignUp) {
                const { error } = await signIn(String(email), String(password))
                if (error) {
                    throw new Error(error.message)
                }
            }

            onSuccess()
            toast({
                title: isSignUp ? 'Account created.' : 'Signed in successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true
            })
        } catch (err) {
            console.log({ err })
            toast({
                title: 'An error occurred.',
                description: err?.message ?? 'Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }
    }

    return (
        <Box maxWidth="400px" margin="auto" mt={8}>
            <form onSubmit={handleSubmit} ref={formRef}>
                <VStack spacing={4} align="flex-start">
                    <Heading size="md" color="text.primary">
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Heading>
                    <FormControl isRequired>
                        <FormLabel color="text.secondary" fontSize="xs">
                            Email
                        </FormLabel>
                        <Input type="email" name="email" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel color="text.secondary" fontSize="xs">
                            Password
                        </FormLabel>
                        <Input type="password" name="password" />
                    </FormControl>
                    {isSignUp && (
                        <>
                            <FormControl isRequired>
                                <FormLabel color="text.secondary" fontSize="xs">
                                    Name
                                </FormLabel>
                                <Input type="text" name="name" />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel color="text.secondary" fontSize="xs">
                                    Agency Name
                                </FormLabel>
                                <Input type="text" name="agency_name" />
                            </FormControl>
                        </>
                    )}
                    <Button type="submit" colorScheme="blue" width="full">
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                </VStack>
            </form>
            <Text mt={4} fontSize="sm">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <Link fontSize="sm" color="primary.500" onClick={() => setIsSignUp(!isSignUp)} ml={2}>
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                </Link>
            </Text>
        </Box>
    )
}
