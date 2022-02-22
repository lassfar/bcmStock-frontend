import React from 'react';
import { IButtonProps } from '@/components/types/props';

const Button: React.FC<IButtonProps> = ({ text, customclass, clickEvent, children, ...otherProps }) => {
  return (
    <button className={customclass} {...otherProps} onClick={clickEvent}>
      { text || children }
    </button>
  );
};


export default Button;
