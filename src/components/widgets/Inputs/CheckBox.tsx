import React, { useRef } from "react";
import DynamicIcon from "@/components/widgets/Icons/DynamicIcon";
import { ICheckBox } from "@/components/types/widgets/interfaces";

const CheckBox: React.FC<ICheckBox> = ({
  name,
  id,
  value,
  label,
  clickEvent,
  customclass,
}) => {
  // const checkBoxGroup_ref = useRef(null);
  const checkBox_ref = useRef(null);

  return (
    <div className={`checkBox-group ${customclass}`}>
      
      <div className="form-checkBox / flex items-center gap-3">
        <input
          type={"checkbox"}
          className={`checkBox-input ${customclass}`}
          id={id}
          name={name}
          value={value}
          onClick={clickEvent}
          ref={checkBox_ref}
        />
        <label htmlFor={id} className={`dark:text-white inline text-sm mb-1`}>
          {label}
        </label>
      </div>
    </div>
  );
};

export default CheckBox;
