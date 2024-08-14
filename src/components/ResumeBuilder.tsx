import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Text } from '@chakra-ui/react'
import { Formik } from 'formik'
import { useAtom } from 'jotai'
import { draftAtom } from '../atom/draftAtom'
import { memo } from 'react'

type ResumeBuilderProps = {
    layout: Array<{ component: React.ReactNode; title: string }>
}

export const ResumeBuilder = memo(({ layout }: ResumeBuilderProps) => {
    const [draft, _] = useAtom(draftAtom)

    return (
        <Accordion allowToggle w="full" gap={4} id="resume-builder" defaultIndex={[0]}>
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
                                    <Text fontWeight="500" color="text.primary.800" as="span" flex="1" textAlign="left">
                                        {acc.title}
                                    </Text>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4} key={index}>
                                {acc.component}
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </>
            </Formik>
        </Accordion>
    )
})
