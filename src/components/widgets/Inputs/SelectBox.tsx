import React, { useEffect, useState, useRef } from 'react'
import DynamicIcon from '@/components/widgets/Icons/DynamicIcon'
import { ISelectBox } from '@/components/types/widgets/interfaces'
import { FaChevronDown } from 'react-icons/fa'

const SelectBox: React.FC<ISelectBox> = ({
  name,
  id,
  value,
  label,
  customclass,
  changeEvent,
  optionList
}) => {
  const selectBox_ref = useRef(null)
  const selectBoxGroup_ref = useRef(null)

  return (
    <div
      className={`selectBox-group text-field ${customclass}`}
      ref={selectBoxGroup_ref}
    >
      <label
        htmlFor={id}
        className={`block text-sm text-black dark:text-white mb-1`}
      >
        {label}
      </label>
      <div className="form-selectbox">
        <select
          className={`selectbox-input`}
          id={id}
          name={name}
          value={value}
          onChange={changeEvent}
          ref={selectBox_ref}
        >
          {optionList?.map((option, key) => {
            return (
              <option value={option.value} key={key}>
                {option.text}
              </option>
            )
          })}
        </select>
        <FaChevronDown className="text-dark my-auto text-sm select-none" />
      </div>
    </div>
  )
}

export default SelectBox
