import { DeleteIcon } from '@chakra-ui/icons'
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
    VStack,
    Button,
    IconButton
} from '@chakra-ui/react'
import React, { useState } from 'react'

type StyleControlWrapperProps = {
    children: React.ReactNode
    onRemoveSection: () => void
}

type StyleControlsProps = {
    styles: any
    onStyleChange: (property: string, value: string) => void
    onRemoveSection: () => void
}

const StyleControls = ({ styles, onStyleChange, onRemoveSection }: StyleControlsProps) => {
    return (
        <HStack align="stretch" spacing={2} w="full" rounded="md">
            <VStack w="full" spacing={1}>
                <FormLabel htmlFor="fontSize" fontSize="xs" m={0}>
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
            <VStack w="full" spacing={1}>
                <FormLabel fontSize="xs" htmlFor="fontColor" m={0}>
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
            <VStack w="full" spacing={1}>
                <FormLabel htmlFor="fontFamily" fontSize="xs" m={0}>
                    Typeface:
                </FormLabel>
                <Select
                    size="sm"
                    w="100%"
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
            <VStack w="full" spacing={1} justifyContent="center">
                <IconButton
                    size="md"
                    variant="ghost"
                    aria-label="Add Section"
                    icon={<DeleteIcon color="primary.500" />}
                    onClick={onRemoveSection}
                />
            </VStack>
        </HStack>
    )
}

export const StyleControlWrapper = ({ children, onRemoveSection }: StyleControlWrapperProps) => {
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
            <PopoverContent p={0} bg="gray.50">
                <PopoverBody>
                    <StyleControls
                        styles={styles}
                        onStyleChange={handleStyleChange}
                        onRemoveSection={onRemoveSection}
                    />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}
