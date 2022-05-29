import React from 'react'
import { FiXCircle } from 'react-icons/fi'
import HeadingTitle from '@/components/widgets/Typography/HeadingTitle';

const ErrorIndicator = ({ hasError, message }: any) => {
  return (
    <div className={`${hasError ? 'block' : 'hidden'} / bg-black/20 w-full h-full rounded-xl / absolute top-0 left-0 z-30 p-12`}>
      {message || ""}
      <FiXCircle className="text-3xl text-red-500 m-auto" title="Erreur de modification" />
    </div>
  )
}

export default ErrorIndicator