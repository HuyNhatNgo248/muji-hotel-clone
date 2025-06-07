import { ListItemBlock } from '@/payload-types'
import PayloadRichText from '@/components/shared/payload-richtext'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface InfoProps extends ListItemBlock {
  className?: string
}

const Info: React.FC<InfoProps> = ({ title, description }) => {
  return (
    <>
      {title && <p>{title}</p>}
      {description && <PayloadRichText data={description as SerializedEditorState} />}
    </>
  )
}

export default Info
