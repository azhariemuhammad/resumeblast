import React, { useState, ReactElement } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useAuth } from '../services/useAuth'
import supabase from '../supabaseClient'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react'
import { AuthForm } from './AuthForm'

interface AuthWrapperProps {
    children: ReactElement
    onAuthRequired: () => void
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, onAuthRequired }) => {
    const { session, loading } = useAuth()
    const [showAuth, setShowAuth] = useState<boolean>(false)

    if (loading) {
        return <div>Loading...</div>
    }

    const handleAction = () => {
        if (session) {
            onAuthRequired()
        } else {
            setShowAuth(true)
        }
    }

    if (showAuth) {
        return (
            <Modal isOpen={showAuth} onClose={() => setShowAuth(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <AuthForm onSuccess={() => setShowAuth(false)} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        )
    }

    return React.cloneElement(children, {
        onClick: handleAction
    })
}
