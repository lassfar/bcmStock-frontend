import React, { useEffect } from "react";
import { ICrudAction } from "@/components/types/widgets/interfaces";
import Button from "@/components/widgets/Buttons/Button";
import DynamicIcon from "@/components/widgets/Icons/DynamicIcon";
import { ECrudActionType, EButtonSize, EButtonVariant, EButtonType } from "@/components/types/props/enum";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

const CrudAction: React.FC<ICrudAction> = ({
  actionId,
  actionType,
  title,
  icon,
  hrefLink,
  btnSize,
  textVisibleClasses,
  clickEvent,
  customclass,
  subActions,
  btnVariant,
}) => {
  const router = useRouter();

  // useEffect(() => {
  //   console.log("subActions", subActions);
  // }, [subActions])
  
  // useEffect(() => {
  //   console.log("title", title);
  // }, [title])
  

  const generateClickEvent = (
    e: any,
    actionType: ECrudActionType,
    targetEvent: any,
    targetLink: any,
  ) => {
    if (actionType == ECrudActionType.link) {
      router.push(targetLink);
    } else if (actionType == ECrudActionType.click) {
      targetEvent();
    } else if (actionType == ECrudActionType.menu) {
      showActionDropdown(e);
    }
  };

  const showActionDropdown = (e: any) => {
    e.stopPropagation();
    // get dropdown menu
    // #${actionId} .crudAction_dropdownMenu
    const actionDropdownMenu = document.querySelector(`#${actionId} .crudAction_dropdownMenu`);
    const actionDropdownElems: any[] = Array.from(
      document.querySelectorAll(`.crudAction_dropdownMenu`)
    );
    actionDropdownElems.forEach((el) => {
      if (el != actionDropdownMenu) {
        el.classList.remove("flex");
        el.classList.add("hidden");
      }
    });
    if (actionDropdownMenu?.classList.contains("flex")) {
      actionDropdownMenu?.classList.remove("flex");
      actionDropdownMenu?.classList.add("hidden");
    } else {
      actionDropdownMenu?.classList.add("flex");
      actionDropdownMenu?.classList.remove("hidden");
    }
    // get "actions" parent container
    const actionParentElem = document.getElementById(actionId as any);
    const coords = e.target?.getBoundingClientRect();
    const topPos = coords.top; // get top position
    const leftPos = coords.left; // get left position
    const dropdownMenuWidth: any = actionDropdownMenu?.clientWidth;
    const actionBtnWidth: any = e.target?.clientWidth;
    const actionBtnHeight: any = e.target?.clientHeight;
    actionDropdownMenu?.setAttribute(
      "style",
      `position: fixed !important; top: calc(${parseInt(actionBtnHeight)}px + .5rem + ${parseInt(
        topPos
      )}px) !important; left: calc(${parseInt(leftPos)}px - ${parseInt(
        dropdownMenuWidth
      )}px + ${parseInt(actionBtnWidth)}px) !important;`
    );

    document.addEventListener("mouseup", (event) => {
      if (!actionParentElem?.contains(event.target as any)) {
        // if user has clicked outside
        actionDropdownElems.forEach((el) => {
          if (el != actionDropdownMenu) {
            el.classList.remove("flex");
            el.classList.add("hidden");
          } // if clicked to open dropdown btn
        });
        actionDropdownMenu?.classList.remove("flex");
        actionDropdownMenu?.classList.add("hidden");
      }
    });
    window.addEventListener(
      "scroll",
      () => {
        actionDropdownElems.forEach((el) => {
          el.classList.remove("flex"); // hide dropdown menu
          el.classList.add("hidden");
        });
        actionDropdownMenu?.classList.remove("flex");
        actionDropdownMenu?.classList.add("hidden");
        // window.removeEventListener("scroll");
      },
      true
    );
  }

  return (
    <div className="crudAction / relative z-30" id={actionId}>
      <Button
        type={(actionType == 'submit') ? EButtonType.submit : EButtonType.button}
        clickEvent={(e: any) => generateClickEvent(e, actionType, clickEvent, hrefLink)}
        customclass={customclass}
        variant={EButtonVariant.primaryActive}
        size={btnSize || EButtonSize.small}
        popTitle={title || ""}
      >
        {icon && <DynamicIcon name={icon} />}
        <span className={textVisibleClasses || 'hidden'}>{title}</span>
      </Button>
      {subActions?.length && (
        <div
          className="crudAction_dropdownMenu / hidden flex-col / fixed w-36 bg-white rounded shadow-lg border / px-1 py-1.5"
        >
          {subActions.map((action, key) => (
            <Button
              type={EButtonType.button}
              clickEvent={(e: any) => generateClickEvent(e, action.actionType, action.clickEvent, action.hrefLink)}
              customclass={`crudAction_dropdownItem / w-full rounded px-2.5 py-1 ${customclass}`}
              variant={btnVariant || EButtonVariant.transparent}
              size={btnSize || EButtonSize.xsmall}
              popTitle={title}
              key={key}
            >
              <span className={"text-primary"}>{action.title}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CrudAction;
