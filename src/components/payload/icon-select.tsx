'use client'

import { IconContext } from 'react-icons'
import * as Lu from 'react-icons/lu'
import { SelectInput, useField } from '@payloadcms/ui'
import { OptionObject } from 'payload'

interface IconPacks {
  [key: string]: {
    [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>>
  }
}

const iconPacks: IconPacks = { Lu }

export const reactIconOptions = () => {
  const options: OptionObject[] = []
  Object.entries(iconPacks).forEach(([packName, pack]) => {
    Object.keys(pack).forEach((iconName) => {
      options.push({
        label: `${packName}/${iconName}`,
        value: `${packName}/${iconName}`,
      })
    })
  })
  return options
}

type ReactIconSelectComponentProps = {
  path: string
}

const IconSelect: React.FC<ReactIconSelectComponentProps> = ({ path }) => {
  const { value, setValue } = useField<string>({ path })

  const renderIcon = () => {
    if (!value) return null
    const [packName, iconName] = value.split('/')
    const IconComponent = iconPacks[packName]?.[iconName]
    return IconComponent ? <IconComponent /> : null
  }

  return (
    <div>
      <SelectInput
        path={path}
        name={path}
        value={value}
        label={'Icon'}
        description={'Select an icon from React Icons'}
        hasMany={false}
        options={reactIconOptions()}
        onChange={(e) => {
          setValue((e as { value: unknown })?.value)
        }}
      />
      {value && (
        <span>
          Icon Preview:{' '}
          <IconContext.Provider value={{ size: '1.5em' }}>{renderIcon()}</IconContext.Provider>
        </span>
      )}
    </div>
  )
}

export default IconSelect
