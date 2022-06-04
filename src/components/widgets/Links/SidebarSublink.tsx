import React from "react";
import { ILink } from "@/components/types/props";
import Link from "next/link";
import { ISidebarSublink } from "@/components/types/widgets/interfaces";
import { useRouter } from 'next/router';
import HeadingTitle from '@/components/widgets/Typography/HeadingTitle';
import { ETextSize } from '@/components/types/props/enum'

const SidebarSublink: React.FC<ISidebarSublink> = ({
  text,
  customclass,
  hrefLink,
  isActive,
  children,
}) => {
  const router = useRouter()
  const isActiveLink = (hrefLink: string): boolean => router.pathname.includes(hrefLink)

  return (
    <HeadingTitle textSize={ETextSize.sm} customclass="ml-2">
      <Link href={hrefLink}>
        <a
          className={`sidebar-sublink ${customclass || ""}${isActiveLink(hrefLink) ? " active" : ""}`}
        >
          {text || children}
        </a>
      </Link>
    </HeadingTitle>
  );
};

export default SidebarSublink;
