import React from 'react'
import { ICrudLayout } from '@/components/types/widgets/interfaces';
import HeadingTitle from '@/components/widgets/Typography/HeadingTitle';
import Button from '@/components/widgets/Buttons/Button';
import { EButtonSize, EButtonVariant, ECrudActionType } from '@/components/types/props/enum';
import DynamicIcon from '@/components/widgets/Icons/DynamicIcon';
import { useRouter } from 'next/router';
import CrudAction from '../list/CrudAction';


const CrudLayout: React.FC<ICrudLayout> = ({ headingText, subHeadingText, actionList, children }) => {

  const router = useRouter();

  const generateClickEvent = (
    actionType: ECrudActionType,
    targetEvent: any,
    targetLink: any,
  ) => {
    if (actionType == ECrudActionType.link) {
      router.push(targetLink);
    } else {
      targetEvent();
    }
  };


  return (
    <div className="CrudLayout / w-full bg-white dark:bg-gray-800 rounded / border-b-4 border-dark dark:border-white / focus-within:shadow-md shadow px-4 lg:px-8 pt-4">
      <div className="CrudLayout_header / flex items-center pb-4">
        <div className="w-1/2 / flex flex-col">
          <HeadingTitle textSize={6} customclass="font-bold text-dark dark:text-white">
            {headingText}
          </HeadingTitle>
          <HeadingTitle textSize={9} customclass="font-semibold text-gray-400">
            {subHeadingText}
          </HeadingTitle>
        </div>
        <div className="crudLayout_headerActions / w-1/2 / flex justify-end">
          {actionList?.map((action, key) => {
            return (
              <CrudAction {...action} key={key} />
            )
          })}
        </div>
      </div>

      <div className="CrudLayout_body / overflow-x-auto py-4">
        {children}
      </div>
    </div>
  )
}

export default CrudLayout

CrudLayout.defaultProps = {
  headingText: "List",
  subHeadingText: "Total des elements",
}