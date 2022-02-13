import React from 'react';
import { IButtonProps } from '@/components/types/props';

const Button: React.FC<IButtonProps> = ({ text, customClass, children, ...otherProps }) => {
  return (
    <button {...otherProps}>
      { text || children }
    </button>
  );
};


export default Button;
