import React from 'react';
import { IReactIcon } from '@/components/types/props';


const DynamicIcon: React.FC<IReactIcon> = ({ name, size, customclass }) => {
  return (
    React.createElement(name, {
      style: {
        width: size || "1rem",
        height: size || "1rem",
        minHeight: size || "1rem",
        maxHeight: size || "1rem"
      },
      className: customclass
    })
  );
};

export default DynamicIcon;
