import React, { useState } from "react";
import { IHeading } from "@/components/types/props";

const HeadingTitle: React.FC<IHeading> = ({ text, textSize, customclass, children }) => {

  return <h1 className={`${textSize} ${customclass}`}>{text || children}</h1>;
};

export default HeadingTitle;
