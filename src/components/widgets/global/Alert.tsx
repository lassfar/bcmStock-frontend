import React, { useState, useEffect } from 'react'
import HeadingTitle from '@/components/widgets/Typography/HeadingTitle';
import { IAlert } from '@/components/types/widgets/interfaces';
import { EAlertTheme } from '@/components/types/props/enum';
import { FaInfo, FaTimes } from 'react-icons/fa';
import Button from '@/components/widgets/Buttons/Button';
import { removeAlert } from '@/app/store/redux/actions/widgets';
import { useAppDispatch } from '@/app/store/redux/hooks';


const Alert: React.FC<IAlert> = ({
  id,
  title,
  message,
  variant,
  customclass,
  isShown,
  timer,
}) => {
  // redux dispatcher
  const dispatch = useAppDispatch();
  const [isOpen, setOpen] = useState(isShown);
  useEffect(() => {
    setOpen(isShown);
    // setTimeout(() => {
    //   setOpen(false)
    // }, timer);
  }, [isShown])


  const closeAlert = (id: string) => {
    dispatch(removeAlert({id}));
    setOpen(false);
  }  

  return (
    <div className={`alert ${variant} ${customclass} ${isOpen ? 'block' : 'hidden'}`}>
      <div className="alert-content">
        <div className="col-span-1">
          <div className="flex w-10 h-10 md:w-14 md:h-14 rounded-full shadow bg-dark dark:bg-black/20">
            <FaInfo className={'text-2xl text-dark dark:text-white m-auto'} />
          </div>
        </div>
        <div className="col-span-5 flex flex-col ml-3">
          <HeadingTitle textSize={8} text={title} customclass={"font-bold"} />
          <HeadingTitle textSize={9} text={message} customclass={"font-semibold"} />
        </div>
        <Button type={"button"} customclass="absolute top-2 right-2" clickEvent={() => closeAlert(id)}>
          <FaTimes />
        </Button>
      </div>
    </div>
  )
}

export default Alert

Alert.defaultProps = {
  title: "success",
  message: "operation with success",
  variant: EAlertTheme.info,
  isShown: false,
  timer: 5000,
}