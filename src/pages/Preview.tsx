import { useAtom, useAtomValue } from 'jotai'
import { draftAtom } from '../atom/draftAtom'
import { StackResume } from '../components/examples/StackResume'
import { layoutAtom } from '../atom/layoutAtom'
import { Box, Button, IconButton } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { stylesAtom } from '../atom/stylesAtom'
import { watermarkAtom } from '../atom/watermarkAtom'
import { useEffect, useRef } from 'react'
import { useWatermark } from '../components/Watermark'

const BackButton = () => {
    const navigate = useNavigate()
    return (
        <IconButton
            aria-label="back"
            my={2}
            ml={4}
            size="sm"
            variant="outline"
            borderWidth={2}
            icon={<ArrowBackIcon color="primary.400" />}
            onClick={() => navigate(-1)}
            _hover={{ borderColor: 'primary.8   00' }}
            borderRadius="50%"
            w="50px"
            h="50px"
        />
    )
}
export const Preview = () => {
    const params = new URLSearchParams(window.location.search)
    const ref = useRef<HTMLDivElement>(null)
    const template = params.get('template')
    const draft = useAtomValue(draftAtom)
    const layout = useAtomValue(layoutAtom)
    const styles = useAtomValue(stylesAtom)
    const watermark = useAtomValue(watermarkAtom)
    useWatermark(ref, watermark)
    console.log({ draft, layout, styles, watermark })

    let component: React.ReactNode

    switch (template) {
        case 'stack':
            component = <StackResume currentStyles={styles} data={draft} layout={layout} disabled />
            break
        case 'cover':
            component = <>Cover</>
            break
        default:
            component = <>Default</>
            break
    }

    return (
        <>
            <BackButton />
            <Box
                maxW="1200px"
                w="full"
                margin="auto"
                boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;"
                borderRadius="md"
                bg="white"
                p={4}
                ref={ref}
            >
                {component}
            </Box>
        </>
    )
}
