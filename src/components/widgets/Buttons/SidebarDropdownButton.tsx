import React from 'react'
import { ILink } from '@/components/types/props'
import Link from 'next/link'
import { ISidebarDropdownButton } from '@/components/types/widgets/interfaces'
import { useRouter } from 'next/router'
import Button from './Button'

const SidebarDropdownButton: React.FC<ISidebarDropdownButton> = ({
  text,
  customclass,
  isActive,
  children,
}) => {

  return (
    <Button
      type={'button'}
      customclass={`sidebar-dropdownButton ${customclass || ''} ${isActive ? ' active' : ''}`}
    >
      {text || children}
    </Button>
  )
}

export default SidebarDropdownButton
