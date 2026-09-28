'use client';

import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import { faqs } from '@/data/marketing';

export function FAQ() {
  return (
    <Accordion allowToggle defaultIndex={[0]} borderTopWidth="1px" borderColor="border.subtle">
      {faqs.map((faq) => (
        <AccordionItem key={faq.question}>
          <h3>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {faq.question}
              </Box>
              <AccordionIcon color="text.muted" />
            </AccordionButton>
          </h3>
          <AccordionPanel>{faq.answer}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
