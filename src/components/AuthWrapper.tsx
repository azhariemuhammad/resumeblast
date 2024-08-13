import React, { useState, ReactElement } from 'react'
import { useAuth } from '../services/useAuth'
import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react'
import { AuthForm } from './AuthForm'

type AuthWrapperProps = {
    children: ReactElement
    onAuthRequired?: () => void
}

type AuthModalProps = {
    showAuth: boolean
    onClose: () => void
}

export const AuthModal = ({ showAuth, onClose }: AuthModalProps) => {
    return (
        <Modal isOpen={showAuth} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalBody>
                    <AuthForm onSuccess={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, onAuthRequired = () => {} }) => {
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
        return <AuthModal showAuth={showAuth} onClose={() => setShowAuth(false)} />
    }

    return React.cloneElement(children, {
        onClick: handleAction
    })
}
