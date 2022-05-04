import React from "react";
import { IButtonProps } from "@/components/types/props";

const Button: React.FC<IButtonProps> = ({
  type,
  text,
  customclass,
  popTitle,
  variant,
  leadingIcon,
  clickEvent,
  children,
  size,
  ...otherProps
}) => {
  return (
    <button
      type={type}
      className={`${variant} ${!size ? "btn" : size} ${customclass}`}
      onClick={clickEvent}
      title={popTitle}
      {...otherProps}
    >
      {text || children}
    </button>
  );
};

export default Button;
