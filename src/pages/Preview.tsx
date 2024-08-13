import { useAtomValue } from 'jotai'
import { draftAtom } from '../atom/draftAtom'
import { StackResume } from '../components/examples/StackResume'
import { layoutAtom } from '../atom/layoutAtom'
import { Box, IconButton } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { stylesAtom } from '../atom/stylesAtom'
import { watermarkAtom } from '../atom/watermarkAtom'
import { useRef } from 'react'
import { useWatermark } from '../components/Watermark'

type BackButtonProps = {
    onHidePreview: () => void
}

const BackButton = ({ onHidePreview }: BackButtonProps) => {
    return (
        <IconButton
            aria-label="back"
            my={2}
            ml={4}
            size="sm"
            variant="outline"
            borderWidth={2}
            icon={<ArrowBackIcon color="primary.400" />}
            onClick={onHidePreview}
            _hover={{ borderColor: 'primary.8   00' }}
            borderRadius="50%"
            w="50px"
            h="50px"
        />
    )
}

type PreviewProps = {
    onHidePreview: () => void
}
export const Preview = ({ onHidePreview }: PreviewProps) => {
    const params = new URLSearchParams(window.location.search)
    const ref = useRef<HTMLDivElement>(null)
    const template = params.get('template')
    const draft = useAtomValue(draftAtom)
    const layout = useAtomValue(layoutAtom)
    const styles = useAtomValue(stylesAtom)
    const watermark = useAtomValue(watermarkAtom)
    useWatermark(ref, watermark)
    console.log({ draft, layout, styles, watermark, template })

    return (
        <>
            <BackButton onHidePreview={onHidePreview} />
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
                <StackResume currentStyles={styles} data={draft} layout={layout} disabled />
            </Box>
        </>
    )
}
