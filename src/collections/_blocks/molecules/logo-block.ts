import { Block } from 'payload'

const LogoBlock: Block = {
  slug: 'logo',
  interfaceName: 'LogoBlock',
  fields: [
    {
      name: "companyName",
      type: "text",
      defaultValue: "MUJI",
      required: true,
    },
    {
      name: "branchName",
      type: "text",
    }
  ],
}

export default LogoBlock
