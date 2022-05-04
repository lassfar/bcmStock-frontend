import React, { useRef } from "react";
import { IRadioButton } from "@/components/types/widgets/interfaces";

const RadioButton: React.FC<IRadioButton> = ({
  name,
  id,
  value,
  label,
  clickEvent,
  customclass,
}) => {
  const radioButton_ref = useRef(null);
  const radioButtonGroup_ref = useRef(null);

  return (
    <div className={`radioButton-group ${customclass}`} ref={radioButtonGroup_ref}>
      <div className="form-radioButton / flex items-center gap-3">
        <input
          type={"radio"}
          className={`radioButton-input ${customclass}`}
          id={id}
          name={name}
          value={value}
          onClick={clickEvent}
          ref={radioButton_ref}
        />
        <label htmlFor={id} className={`dark:text-white inline text-sm mb-1`}>
          {label}
        </label>
      </div>
    </div>
  );
};

export default RadioButton;
