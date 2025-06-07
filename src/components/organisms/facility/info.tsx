import { ListItemBlock } from '@/payload-types'
import { cn } from '@/lib/utils'
import PayloadRichText from '@/components/shared/payload-richtext'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface InfoProps extends ListItemBlock {
  className?: string
}

const Info: React.FC<InfoProps> = ({ className, title, description }) => {
  return (
    <div className={cn('flex gap-12 text-xs font-bold', className)}>
      {title && <p>{title}</p>}
      {description && <PayloadRichText data={description as SerializedEditorState} />}
    </div>
  )
}

export default Info
