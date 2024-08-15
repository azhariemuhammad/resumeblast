import { Flex, IconButton } from '@chakra-ui/react'

type Align = 'left' | 'center' | 'right'
type AlignSwitchProps = {
    alignment?: Align
    onToggle: (value: Align) => void
}

const AlignIcon = ({ align }: { align: Align }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="20" height="20">
        {align === 'left' && (
            <>
                <rect x="2" y="5" width="20" height="3" fill="currentColor" />
                <rect x="2" y="11" width="16" height="3" fill="currentColor" />
                <rect x="2" y="17" width="22" height="3" fill="currentColor" />
            </>
        )}
        {align === 'center' && (
            <>
                <rect x="5" y="5" width="20" height="3" fill="currentColor" />
                <rect x="7" y="11" width="16" height="3" fill="currentColor" />
                <rect x="4" y="17" width="22" height="3" fill="currentColor" />
            </>
        )}
        {align === 'right' && (
            <>
                <rect x="8" y="5" width="20" height="3" fill="currentColor" />
                <rect x="12" y="11" width="16" height="3" fill="currentColor" />
                <rect x="6" y="17" width="22" height="3" fill="currentColor" />
            </>
        )}
    </svg>
)

export const AlignSwitch = ({ alignment = 'left', onToggle }: AlignSwitchProps) => {
    const handleToggle = (value: Align) => {
        onToggle(value)
    }

    return (
        <Flex
            bg="gray.100"
            borderRadius="md"
            p="2px"
            width="96px"
            height="28px"
            alignItems="center"
            justifyContent="space-between"
            position="relative"
            transition="all 0.2s"
            _hover={{ bg: 'gray.200' }}
        >
            <Flex
                justify="center"
                align="center"
                width="30px"
                height="24px"
                zIndex={1}
                bg={alignment === 'left' ? 'white' : 'transparent'}
            >
                <IconButton
                    icon={<AlignIcon align="left" />}
                    variant="ghost"
                    aria-label="left align"
                    size="sm"
                    onClick={() => handleToggle('left')}
                />
            </Flex>
            <Flex
                justify="center"
                align="center"
                width="30px"
                height="24px"
                zIndex={1}
                bg={alignment === 'center' ? 'white' : 'transparent'}
            >
                <IconButton
                    onClick={() => handleToggle('center')}
                    icon={<AlignIcon align="center" />}
                    variant="ghost"
                    aria-label="center align"
                    size="sm"
                />
            </Flex>
            <Flex
                justify="right"
                align="center"
                width="30px"
                height="24px"
                zIndex={1}
                bg={alignment === 'right' ? 'white' : 'transparent'}
            >
                <IconButton
                    onClick={() => handleToggle('right')}
                    icon={<AlignIcon align="right" />}
                    variant="ghost"
                    aria-label="right align"
                    size="sm"
                />
            </Flex>
        </Flex>
    )
}
