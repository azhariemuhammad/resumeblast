import {
    Box,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    FormLabel,
    Input,
    Select,
    VStack,
    Button,
    Flex
} from '@chakra-ui/react'
import React, { ReactNode, useState } from 'react'
import { AlignSwitch } from './AlignSwitch'
import { LayoutStyles } from '../types'

type StyleControlWrapperProps = {
    children: ((styles: any) => ReactNode) | ReactNode
    onSaveStyles: (styles: any) => void
    onRemoveSection: () => void
    disabled?: boolean
    height?: string
    placement?: string
    defaultValue?: LayoutStyles
}

type StyleControlsProps = {
    styles: any
    onStyleChange: (property: string, value: string) => void
    onRemoveSection: () => void
}

type ViewSwitchProps = {
    isCol: boolean
    onToggle: (view: 'row' | 'col') => void
}

const ViewSwitch = ({ isCol = false, onToggle }: ViewSwitchProps) => {
    const handleToggle = () => {
        onToggle(isCol ? 'row' : 'col')
    }

    return (
        <Flex
            as="button"
            bg="gray.100"
            borderRadius="md"
            p="2px"
            width="64px"
            height="28px"
            alignItems="center"
            justifyContent="space-between"
            position="relative"
            onClick={handleToggle}
            transition="all 0.2s"
            _hover={{ bg: 'gray.200' }}
        >
            <Box
                position="absolute"
                left={isCol ? '2px' : '34px'}
                bg="white"
                borderRadius="sm"
                width="28px"
                height="24px"
                transition="left 0.2s"
                boxShadow="sm"
            />
            <Flex justify="center" align="center" width="30px" height="24px" zIndex={1}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M1 1h6v6H1zM9 1h6v6H9zM1 9h6v6H1zM9 9h6v6H9z" fillOpacity={isCol ? '0.7' : '0.3'} />
                </svg>
            </Flex>
            <Flex justify="center" align="center" width="30px" height="24px" zIndex={1}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M1 2h14v3H1zM1 7h14v3H1zM1 12h14v3H1z" fillOpacity={!isCol ? '0.7' : '0.3'} />
                </svg>
            </Flex>
        </Flex>
    )
}

const StyleControls = ({ styles, onStyleChange, onRemoveSection }: StyleControlsProps) => {
    return (
        <Flex gap={2} rounded="md" alignItems="center" flexFlow="row wrap">
            <VStack spacing={1}>
                <FormLabel htmlFor="fontSize" fontSize="xs" m={0} color="gray.600">
                    Layout
                </FormLabel>
                <ViewSwitch onToggle={view => onStyleChange('layout', view)} isCol={styles.layout === 'col'} />
            </VStack>
            <VStack>
                <FormLabel htmlFor="fontSize" fontSize="xs" m={0} color="gray.600">
                    Align
                </FormLabel>
                <AlignSwitch onToggle={align => onStyleChange('alignment', align)} alignment={styles.alignment} />
            </VStack>
            <VStack spacing={1}>
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
            <VStack spacing={1}>
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
            <VStack spacing={1}>
                <FormLabel fontSize="xs" htmlFor="fontColor" m={0}>
                    Background Color:
                </FormLabel>
                <Input
                    size="sm"
                    id="bgColor"
                    type="color"
                    value={styles.bgColor}
                    onChange={e => onStyleChange('bgColor', e.target.value)}
                />
            </VStack>
            <VStack spacing={1}>
                <FormLabel htmlFor="fontFamily" fontSize="xs" m={0}>
                    Typeface:
                </FormLabel>
                <Select
                    size="sm"
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
            <VStack spacing={1} justifyContent="center" alignItems="center">
                <Button
                    size="xs"
                    variant="ghost"
                    aria-label="Remove Section"
                    onClick={onRemoveSection}
                    color="text.primary.400"
                >
                    Remove
                </Button>
            </VStack>
        </Flex>
    )
}

export const StyleControlWrapper = ({
    children,
    onRemoveSection,
    disabled,
    height = 'auto',
    onSaveStyles,
    placement = 'bottom-end',
    defaultValue = {
        fontSize: 'md',
        color: '#000000',
        fontFamily: "'Helvetica', sans-serif",
        layout: 'col',
        alignment: 'left',
        bgColor: '#A7E6FF'
    }
}: StyleControlWrapperProps) => {
    const [styles, setStyles] = useState(defaultValue)

    const handleStyleChange = (property: string, value: string) => {
        setStyles(prevStyles => ({
            ...prevStyles,
            [property]: value
        }))
        onSaveStyles({
            ...styles,
            [property]: value
        })
    }

    const renderContent = () => {
        if (typeof children === 'function') {
            return children(styles)
        }
        return React.isValidElement(children) ? React.cloneElement(children, { styles }) : children
    }

    if (disabled) {
        return <Box>{renderContent()}</Box>
    }

    const handleMouseEnter = (event: React.MouseEvent) => {
        event.stopPropagation()
    }

    return (
        <Popover trigger="hover" placement={placement}>
            <PopoverTrigger>
                <Box
                    border="1px solid transparent"
                    _hover={{ border: '1px solid', borderColor: 'primary.200' }}
                    transition="border-color 0.2s"
                    height={height}
                    w="full"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseEnter}
                >
                    {renderContent()}
                </Box>
            </PopoverTrigger>
            <PopoverContent p={0} bg="white">
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
