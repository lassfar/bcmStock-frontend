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
  clickEvent,
  children,
}) => {

  return (
    <button
      onClick={() => clickEvent}
      type={'button'}
      className={`sidebar-dropdownButton ${customclass || ''} ${isActive ? ' active' : ''}`}
    >
      {text || children}
    </button>
  )
}

export default SidebarDropdownButton
