import { forwardRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Button } from '@chakra-ui/react'

type SaveAsPdfButtonProps = {
    onHover: () => void
    onMouseLeave: () => void
}

export const SaveAsPdfButton = forwardRef<HTMLDivElement, SaveAsPdfButtonProps>((props, ref) => {
    const handlePrint = useReactToPrint({
        content: () => ref.current
    })

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            onMouseEnter={props.onHover}
            onMouseLeave={props.onMouseLeave}
        >
            Save as PDF
        </Button>
    )
})
