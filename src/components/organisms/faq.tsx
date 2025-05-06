import { FaqBlock } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import PayloadRichText from '@/components/shared/payload-richtext'

interface FaqProps extends FaqBlock {
  className?: string
}

const Faq: React.FC<FaqProps> = ({ className, groupTitle, faqItems }) => {
  return (
    <div className={cn('', className)}>
      <Accordion type="multiple">
        {groupTitle && <h4 className="text-xl font-semibold mb-4">{groupTitle}</h4>}
        {faqItems?.map((item, index) => (
          <AccordionItem
            value={`${item.id}-${index}`}
            key={`${item.id}-${index}`}
            className="border-none mb-2 last:mb-0"
          >
            <AccordionTrigger className="cursor-pointer hover:no-underline bg-gray-100 px-4 rounded-none">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              <div className="md:ml-8 ml-6 mt-4 prose prose-sm prose-ul:pl-6">
                {item.answer && <PayloadRichText data={item.answer as SerializedEditorState} />}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default Faq
