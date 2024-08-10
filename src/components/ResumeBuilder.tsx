import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react'
import { sectionItems } from './shared'

type ResumeBuilderProps = {
    layout: Array<{ component: React.ReactNode; title: string }>
}

export const ResumeBuilder = ({ layout }: ResumeBuilderProps) => {
    return (
        <Accordion allowToggle w="full" gap={4}>
            {layout.map((acc, index) => (
                <AccordionItem
                    key={index}
                    border="none"
                    boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
                    mb={4}
                    borderRadius="md"
                >
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                {acc.title}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>{acc.component}</AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
