import React, { useState } from "react";
import { IHeading } from "@/components/types/props";
import { textSizes_enumList } from '@/components/types/props/enum';

const HeadingTitle: React.FC<IHeading> = ({ text, textSize, customclass, children }) => {
  const [textSizes, setTextSizes] = useState(textSizes_enumList[textSize as number])

  return <h1 className={`${textSizes} ${customclass}`}>{text || children}</h1>;
};

export default HeadingTitle;
