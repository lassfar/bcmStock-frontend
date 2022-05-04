import React, { useEffect, useState, useRef } from 'react'
import { ITextArea } from '@/components/types/widgets/interfaces'

const TextArea: React.FC<ITextArea> = ({
  name,
  id,
  placeholder,
  customclass,
  value,
  label,
  rows,
  minLength,
  maxLength,
  changeEvent,
}) => {
  const [isFocused, setFocus] = useState(false)
  const textArea_ref = useRef(null)
  const textAreaGroup_ref = useRef(null)

  return (
    <div className={`input-group text-field ${customclass}`} ref={textAreaGroup_ref} >
      <label htmlFor={id} className={`block text-sm text-black dark:text-white mb-1`} >
        {label}
      </label>
      <div className="form-textarea">
        <textarea
          className={`textarea-input`}
          id={id}
          name={name}
          placeholder={placeholder}
          rows={rows}
          onChange={changeEvent}
          value={value}
          ref={textArea_ref}
        >
        </textarea>
      </div>
    </div>
  )
}

export default TextArea
