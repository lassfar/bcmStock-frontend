import React, { useEffect, useState, useRef } from 'react'
import { ITextBox } from '@/components/types/widgets/interfaces'
import DynamicIcon from '@/components/widgets/Icons/DynamicIcon'

const TextBox: React.FC<ITextBox> = ({
  name,
  id,
  placeholder,
  customclass,
  label,
  value,
  leadingIcon,
  tealingIcon,
  register,
  errors,
  attrs,
  readonly,
  changeEvent,
}) => {

  // useEffect(() => {
    // console.log(inputName, errors);
  // }, [errors])

  // const [isFocused, setFocus] = useState(false)
  // const [inputValue, setInputValue] = useState<string>("")
  // const textFieldGroup_ref = useRef(null)
  const textField_ref = useRef(null)
  const inputName = name;

  // const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value)
  // }

  return (
    <div className={`input-group text-field ${customclass}`} >
      <label htmlFor={id} className={`block text-sm text-black dark:text-white mb-1`}>
        {label}
      </label>
      <div className={`form-textbox / ${readonly ? 'read ': ''} ${(errors && errors) ? 'is-invalid' : ''}`}>
        {leadingIcon && (
          <DynamicIcon name={leadingIcon} customclass="my-auto" />
        )}
        <input
          type="text"
          className={`textbox-input / ${leadingIcon ? 'pr-2' : ''} ${tealingIcon ? 'pl-2' : ''}`}
          id={id}
          name={name}
          placeholder={placeholder}
          onBlur={() => true}
          ref={textField_ref}
          onChange={changeEvent}
          value={value}
          readOnly={readonly}
          {...register}
        />
        {tealingIcon && (
          <button type="button" className="">
            <DynamicIcon name={tealingIcon} customclass="m-auto" />
          </button>
        )}
      </div>
      <small className={`${(errors && errors.message) ? 'text-danger': 'text-green-500'}`}>{errors?.message}</small>
    </div>
  )
}

export default TextBox
