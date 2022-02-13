import React from 'react';
import { IReactIconProps } from '@/components/types/props';


const DynamicIcon: React.FC<IReactIconProps> = ({ name, size, customClass }) => {
  return (
    React.createElement(name, {
      style: {
        width: size || "1.5rem",
        height: size || "1.5rem",
        minHeight: size || "1.5rem",
        maxHeight: size || "1.5rem"
      },
      className: customClass
    })
  );
};

export default DynamicIcon;
