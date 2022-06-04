import React from 'react'
import { ILink } from '@/components/types/props'
import Link from 'next/link'
import { useRouter } from 'next/router';
import HeadingTitle from '@/components/widgets/Typography/HeadingTitle';
import { ETextSize } from '@/components/types/props/enum'

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
    <HeadingTitle textSize={ETextSize.sm} customclass="ml-2">
      <Link href={hrefLink}>
        <a
          className={`sidebar-link ${customclass || ''}
            ${isActiveLink() ? ' active' : ''}`}
        >
          {text || children}
        </a>
      </Link>
    </HeadingTitle>
  )
}

export default SidebarLink
