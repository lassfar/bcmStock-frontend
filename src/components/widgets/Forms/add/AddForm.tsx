import React from 'react'
import { IForm } from '@/components/types/widgets/interfaces';
import Button from '@/components/widgets/Buttons/Button';
import { FaPlusSquare, FaTimesCircle } from 'react-icons/fa';

const AddForm: React.FC<IForm> = ({ id, name, action, method, submitEvent, children }) => {
  
  const submitForm = (e: any) => {
    e.preventDefault();
    submitEvent
  }

  return (
    <form onSubmit={(e) => submitForm(e)}>
      {children}
      <div className="form-action-group / w-full flex items-start justify-center gap-5 mt-6">
        <Button type={'submit'} variant={'btn-primary'}>
          <FaPlusSquare className="text-xl" />
          AJOUTER
        </Button>
        <Button type={'button'} variant={'btn-danger'}>
          <FaTimesCircle className="text-xl" />
          ANNULER
        </Button>
      </div>
    </form>
  )
}

export default AddForm