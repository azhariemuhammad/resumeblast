import { DeleteIcon } from '@chakra-ui/icons'
import {
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Modal,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Select,
    VStack,
    FormLabel,
    useDisclosure,
    Flex
} from '@chakra-ui/react'
import { Button, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { LayoutStyles } from '../types'

type WatermarkStyle = {
    fontSize?: string
    fontColor?: string
    fontFamily?: string
    opacity: number
    watermarkText: string
}

type WatermarkProps = {
    applyWatermark: (props: WatermarkStyle) => void
    removeWatermark: () => void
}

export const useWatermark = (
    ref: React.RefObject<HTMLDivElement>,
    watermark: LayoutStyles & { watermarkText: string }
) => {
    const [currentWatermark, setCurrentWatermark] = useState({})
    const applyWatermark = (props: WatermarkStyle) => {
        const { watermarkText, fontSize, fontColor, fontFamily, opacity } = props
        const resume = ref.current ?? { width: 0, height: 0, src: {} }
        const width = resume.width ?? '300px'
        const height = resume.height ?? '300px'
        const textCoords = [0, parseInt(height) - 20]

        let canvas = document.createElement('canvas')
        canvas.setAttribute('width', width)
        canvas.setAttribute('height', height)
        let ctx: CanvasRenderingContext2D = canvas.getContext('2d')!
        ctx.globalAlpha = opacity ?? 0.3
        ctx.textAlign = 'left'
        ctx.textBaseline = 'bottom'
        ctx.font = `${fontSize} ${fontFamily ?? 'Inter sans-serif'}`
        ctx.fillStyle = fontColor ?? '#000'
        ctx.fillText(watermarkText, textCoords[0], textCoords[1])

        const base64Url = canvas.toDataURL()

        const styleStr = `
            background-image: url('${base64Url}')
        `
        // apply watermark to resume
        resume.setAttribute('style', styleStr)
        setCurrentWatermark({ ...props })
    }

    const removeWatermark = () => {
        const resume = ref.current ?? { width: 0, height: 0, src: {} }
        resume.removeAttribute('style')
    }

    useEffect(() => {
        if (Object.keys(watermark).length === 0) return
        applyWatermark(watermark)
    }, [watermark])

    return {
        applyWatermark,
        removeWatermark,
        currentWatermark
    }
}

export const Watermark = ({ applyWatermark, removeWatermark }: WatermarkProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const formRef = React.useRef()

    const onSubmit = e => {
        e.preventDefault()
        const formData = new FormData(formRef.current)
        const watermarkText = formData.get('watermarkText')
        const fontSize = formData.get('fontSize')
        const fontColor = formData.get('fontColor')
        const fontFamily = formData.get('fontFamily')
        const opacity = formData.get('opacity')
        applyWatermark({ watermarkText, fontSize, fontColor, fontFamily, opacity })
    }

    return (
        <>
            <Button ref={btnRef} size="sm" variant="ghost" color="text.secondary" onClick={onOpen}>
                Watermark
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Watermark</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form ref={formRef}>
                            <VStack w="full" spacing={1} alignItems="start" gap={4}>
                                <Input placeholder="Type here..." name="watermarkText" />
                                <FormLabel htmlFor="fontSize" fontSize="sm" m={0}>
                                    Font Size:
                                </FormLabel>
                                <Select id="fontSize" size="sm" name="fontSize">
                                    <option value="1rem">Small</option>
                                    <option value="2rem">Medium</option>
                                    <option value="4rem">Large</option>
                                </Select>

                                <FormLabel fontSize="sm" htmlFor="fontColor" m={0}>
                                    Font Color:
                                </FormLabel>
                                <Input size="sm" id="fontColor" type="color" w="50px" name="fontColor" />

                                <FormLabel htmlFor="fontFamily" fontSize="sm" m={0}>
                                    Typeface:
                                </FormLabel>
                                <Select size="sm" w="auto" id="fontFamily" name="fontFamily">
                                    <option value="'Helvetica', sans-serif">Helvetica</option>
                                    <option value="'Arial', sans-serif">Arial</option>
                                    <option value="'Georgia', serif">Georgia</option>
                                    <option value="'Courier New', monospace">Courier New</option>
                                    <option value="'Inter', sans-serif">Inter</option>
                                    <option value="'Roboto', sans-serif">Roboto</option>
                                </Select>

                                <FormLabel htmlFor="fontFamily" fontSize="sm" m={0}>
                                    Opacity
                                </FormLabel>
                                <Flex gap={2} w="full" justifyContent="center" alignItems="center">
                                    <Slider
                                        aria-label="slider-ex-1"
                                        defaultValue={0.3}
                                        step={0.1}
                                        min={0}
                                        max={1}
                                        name="opacity"
                                    >
                                        <SliderTrack>
                                            <SliderFilledTrack />
                                        </SliderTrack>
                                        <SliderThumb />
                                    </Slider>
                                    <Input type="number" defaultValue={0.3} name="opacity" />
                                </Flex>
                            </VStack>
                        </form>
                    </ModalBody>

                    <ModalFooter gap={2}>
                        <Button
                            size="md"
                            fontSize="sm"
                            rightIcon={<DeleteIcon />}
                            variant="ghost"
                            onClick={removeWatermark}
                        >
                            Reset
                        </Button>
                        <Button size="sm" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button size="sm" colorScheme="blue" onClick={onSubmit}>
                            Apply
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
