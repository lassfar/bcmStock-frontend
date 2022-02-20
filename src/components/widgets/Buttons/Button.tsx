import React from 'react';
import { IButtonProps } from '@/components/types/props';

const Button: React.FC<IButtonProps> = ({ text, customclass, children, ...otherProps }) => {
  return (
    <button className={customclass} {...otherProps}>
      { text || children }
    </button>
  );
};


export default Button;
