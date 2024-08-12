import React from 'react'
import { routes } from './routes'
import './styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuth } from './services/useAuth'
import { useUserService } from './services/useUserService'
import { useToast } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { User, userAtom } from './atom/userAtom'

type UserProviderProps = {
    children: React.ReactNode
}
const UserProvider = ({ children }: UserProviderProps) => {
    const toast = useToast()
    const { session } = useAuth()
    const userEmail = session?.user?.email ?? ''
    const [_, setUser] = useAtom(userAtom)

    useQuery({
        queryKey: ['user'],
        enabled: Boolean(userEmail),
        queryFn: () =>
            useUserService()
                .getUser(userEmail)
                .then(res => {
                    if (!res?.length) return
                    setUser(res[0] as User)
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

    return <>{children}</>
}
const App = () => {
    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000
                    }
                }
            })
    )

    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>{routes}</UserProvider>
        </QueryClientProvider>
    )
}

export default App
