import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
    colors: {
        primary: {
            50: '#fff0f0',
            100: '#ffd9d9',
            200: '#ffb3b3',
            300: '#ff8c8c',
            400: '#ff7070',
            500: '#FF5858',
            600: '#ff3d3d',
            700: '#ff2222',
            800: '#ff0808',
            900: '#eb0000'
        },
        secondary: {
            50: '#FAFAFA',
            100: '#F4F4F5',
            200: '#E4E4E7',
            300: '#D4D4D8',
            400: '#A1A1AA',
            500: '#71717A',
            600: '#52525B',
            700: '#3F3F46',
            800: '#27272A',
            900: '#18181B'
        },
        text: {
            primary: '#09090B',
            secondary: '#71717A'
        }
    },
    fonts: {
        heading: 'Inter, sans-serif',
        body: 'Inter, sans-serif'
    },
    components: {
        Heading: {
            baseStyle: {
                fontWeight: '700',
                color: 'text.primary'
            }
        },
        Text: {
            baseStyle: {
                color: 'text.primary'
            },
            variants: {
                primary: {
                    color: 'text.primary'
                },
                secondary: {
                    color: 'text.secondary'
                }
            }
        },
        Button: {
            baseStyle: {
                fontWeight: '500'
            },
            variants: {
                solid: props => ({
                    bg: props.colorMode === 'dark' ? 'primary.500' : 'primary.500',
                    color: 'white',
                    _hover: {
                        bg: props.colorMode === 'dark' ? 'primary.600' : 'primary.400'
                    }
                }),
                outline: props => ({
                    borderColor: 'primary.500',
                    color: props.colorMode === 'dark' ? 'primary.300' : 'primary.500',
                    _hover: {
                        bg: props.colorMode === 'dark' ? 'primary.800' : 'primary.50'
                    }
                })
            }
        }
    }
})
