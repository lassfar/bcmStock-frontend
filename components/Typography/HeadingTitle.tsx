import React, { useState } from "react";
import { IHeadingProps } from "@/components/types/props";
import { typographySizes_data } from '@/components/UI/_data';

const HeadingTitle: React.FC<IHeadingProps> = ({ text, typographySize, customClass, children }) => {
  const [textSizes, setTextSizes] = useState(typographySizes_data[typographySize as number])

  return <h1 className={`${textSizes} ${customClass}`}>{text || children}</h1>;
};

export default HeadingTitle;
