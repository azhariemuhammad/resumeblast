import {
    Box,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    FormLabel,
    Input,
    Select,
    HStack,
    VStack
} from '@chakra-ui/react'
import React, { useState } from 'react'

type StyleControlWrapperProps = {
    children: React.ReactNode
}

const StyleControls = ({ styles, onStyleChange }) => {
    return (
        <HStack align="stretch" spacing={4} w="full">
            <VStack w="full">
                <FormLabel htmlFor="fontSize" fontSize="xs">
                    Font Size:
                </FormLabel>
                <Select
                    id="fontSize"
                    size="sm"
                    value={styles.fontSize}
                    onChange={e => onStyleChange('fontSize', e.target.value)}
                >
                    <option value="sm">Small</option>
                    <option value="md">Medium</option>
                    <option value="lg">Large</option>
                </Select>
            </VStack>
            <VStack w="full">
                <FormLabel fontSize="xs" htmlFor="fontColor">
                    Font Color:
                </FormLabel>
                <Input
                    size="sm"
                    id="fontColor"
                    type="color"
                    value={styles.color}
                    onChange={e => onStyleChange('color', e.target.value)}
                />
            </VStack>
            <VStack w="full">
                <FormLabel htmlFor="fontFamily" fontSize="xs">
                    Typeface:
                </FormLabel>
                <Select
                    size="sm"
                    w="fit-content"
                    id="fontFamily"
                    value={styles.fontFamily}
                    onChange={e => onStyleChange('fontFamily', e.target.value)}
                >
                    <option value="'Helvetica', sans-serif">Helvetica</option>
                    <option value="'Arial', sans-serif">Arial</option>
                    <option value="'Georgia', serif">Georgia</option>
                    <option value="'Courier New', monospace">Courier New</option>
                    <option value="'Inter', sans-serif">Inter</option>
                    <option value="'Roboto', sans-serif">Roboto</option>
                </Select>
            </VStack>
        </HStack>
    )
}

export const StyleControlWrapper = ({ children }: StyleControlWrapperProps) => {
    const [styles, setStyles] = useState({
        fontSize: 'md',
        color: '#000000',
        fontFamily: "'Helvetica', sans-serif"
    })

    const handleStyleChange = (property, value) => {
        setStyles(prevStyles => ({
            ...prevStyles,
            [property]: value
        }))
    }

    return (
        <Popover trigger="hover" placement="top-end">
            <PopoverTrigger>
                <Box
                    border="1px solid transparent"
                    _hover={{ border: '1px solid', borderColor: 'primary.200' }}
                    transition="border-color 0.2s"
                >
                    {React.Children.map(children, child => React.cloneElement(child, { styles }))}
                </Box>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverBody>
                    <StyleControls styles={styles} onStyleChange={handleStyleChange} />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}
