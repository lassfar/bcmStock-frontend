import React from 'react'
import { IFieldGroupLayout } from '@/components/types/widgets/interfaces';
import HeadingTitle from '@/components/widgets/Typography/HeadingTitle';

const FieldGroupLayout: React.FC<IFieldGroupLayout> = ({ title, customclass, children }) => {

  return (
    <div className={`fieldGroupLayout / ${customclass} pb-4`}>
      <div className="w-full pb-2">
        <HeadingTitle textSize={6} customclass="font-bold text-dark dark:text-white uppercase">
          {title}
        </HeadingTitle>
      </div>
      <div className="w-full pb-6 border-l-2 border-dashed border-dark dark:border-white pl-4">
        {children}
      </div>
    </div>
  )
}

export default FieldGroupLayout