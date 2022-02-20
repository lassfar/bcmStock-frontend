import React from 'react'
import { ILink } from '@/components/types/props'
import Link from 'next/link'
import { useRouter } from 'next/router';

const SidebarLink: React.FC<ILink> = ({
  text,
  customclass,
  hrefLink,
  isActive,
  children,
}) => {
  const router = useRouter();
  const isActiveLink = (): boolean => router.pathname.includes(hrefLink)
  
  return (
    <Link href={hrefLink}>
      <a
        className={`sidebar-link ${customclass || ''}
          ${isActiveLink() ? ' active' : ''}`}
      >
        {text || children}
      </a>
    </Link>
  )
}

export default SidebarLink
