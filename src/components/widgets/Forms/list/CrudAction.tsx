import React from "react";
import { ICrudAction } from "@/components/types/widgets/interfaces";
import Button from "@/components/widgets/Buttons/Button";
import DynamicIcon from "@/components/widgets/Icons/DynamicIcon";
import { ECrudActionType, EButtonSize, EButtonVariant } from "@/components/types/props/enum";
import { useRouter } from "next/router";

const CrudAction: React.FC<ICrudAction> = ({
  actionType,
  title,
  icon,
  hrefLink,
  btnSize,
  textVisibleClasses,
  clickEvent,
  customclass,
}) => {
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
    <Button
      type={"button"}
      clickEvent={() => generateClickEvent(actionType, clickEvent, hrefLink)}
      customclass={customclass}
      variant={EButtonVariant.primaryActive}
      size={btnSize || EButtonSize.small}
      popTitle={title}
    >
      <DynamicIcon name={icon} />
      <span className={textVisibleClasses || 'hidden'}>{title}</span>
    </Button>
  );
};

export default CrudAction;
