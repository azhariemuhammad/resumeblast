import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react'
import { Formik } from 'formik'
import { useAtom } from 'jotai'
import { draftAtom } from '../atom/draftAtom'

type ResumeBuilderProps = {
    layout: Array<{ component: React.ReactNode; title: string }>
}

export const ResumeBuilder = ({ layout }: ResumeBuilderProps) => {
    const [draft, setDraft] = useAtom(draftAtom)

    return (
        <Accordion allowToggle w="full" gap={4}>
            <Formik initialValues={draft} onSubmit={() => console.log('submit')}>
                <>
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
                </>
            </Formik>
        </Accordion>
    )
}
