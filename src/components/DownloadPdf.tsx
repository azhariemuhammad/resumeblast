import { forwardRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Button } from '@chakra-ui/react'

type SaveAsPdfButtonProps = {
    onHover: () => void
    onMouseLeave: () => void
    ref: HTMLDivElement | null
}

export const SaveAsPdfButton = forwardRef<HTMLButtonElement, SaveAsPdfButtonProps>((props, ref) => {
    const handlePrint = useReactToPrint({
        content: () => ref.current
    })

    return (
        <Button onClick={handlePrint} onMouseEnter={props.onHover} onMouseLeave={props.onMouseLeave}>
            Save as PDF
        </Button>
    )
})
