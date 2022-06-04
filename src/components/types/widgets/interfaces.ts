import { ReactNode } from 'react';
import { IButtonProps, IChildren, ILink } from "@/components/types/props";
import { ICustomClass } from '@/components/types/props/index.d';
import { ECrudActionType, EInputKind, EAlertTheme, EButtonSize, EButtonVariant } from '@/components/types/props/enum';
import { IDataStatus } from '@/components/types/props/index.d';

// SIDEBAR INTERFACES
export interface ISidebarDropdown extends IChildren {
  hrefLink: string,
  text?: string,
  icon?: any,
  isActive?: boolean,
  isDropdown?: boolean,
  links?: ISidebarLink[],
  clickEvent?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => any,
}
export interface ISidebarLink extends ICustomClass, IChildren {
  hrefLink: string,
  text?: string,
  icon?: any,
  isActive?: boolean,
}
export interface ISidebarSublink extends ICustomClass, IChildren {
  text?: string,
  customclass?: string,
  hrefLink: string,
  isActive?: string,
  children?: ReactNode,
}
export interface ISidebarDropdownButton extends ICustomClass, IChildren {
  text?: string,
  icon?: any,
  isActive?: boolean,
  clickEvent?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => any,
}

//______________________________________________________________________________________
// DASHBOARD INTERFACES
export interface IDashboardBox extends ICustomClass, IChildren {
  text: string,
  count: number | string,
  icon: any,
  bgColor: string,
  textColor: string
}
// ******************************* INPUTS *******************************
interface IFieldValidation {
  errors?: any
  register?: any
}
export interface ITextBox extends ICustomClass, IFieldValidation {
  type: string,
  label: string,
  name?: string,
  id: string,
  value?: any,
  placeholder?: string,
  minLength?: number | undefined,
  maxLength?: number | undefined,
  leadingIcon?: any,
  tealingIcon?: any,
  clickEvent?: any,
  changeEvent?: any,
  attrs?: any,
  readonly?: boolean,
}
export interface ITextArea extends ICustomClass, IFieldValidation {
  type?: string,
  label: string,
  name?: string,
  id: string,
  value?: any,
  placeholder?: string,
  rows: number | undefined,
  minLength?: number | undefined,
  maxLength?: number | undefined,
  clickEvent?: any,
  changeEvent?: any,
  attrs?: any,
}
export interface ISelectBox extends ICustomClass, IFieldValidation, IChildren {
  type?: string,
  name?: string,
  id: string,
  value?: any,
  label: string,
  clickEvent?: any,
  changeEvent?: any,
  optionList?: ISelectBoxOption[],
  attrs?: any,
}
export interface ISelectBoxOption {
  text: string | number | boolean,
  value: string | number,
  selected?: boolean,
  disabled?: boolean,
}
export interface ICheckBox extends ICustomClass, IFieldValidation {
  type?: string,
  label: string,
  name?: string,
  id: string,
  value?: any,
  clickEvent?: any,
  changeEvent?: any,
  attrs?: any,
}
export interface IRadioButton extends ICheckBox, IFieldValidation {
}

// ******************************** CRUD LAYOUT ********************************
export interface IForm extends ICustomClass {
  id: string,
  name: string,
  action?: any,
  method?: string,
  submitEvent?: any,
  // fields<T>(args: T[]): Array<T>
  fields?: (ITextBox | ISelectBox | ICheckBox | IRadioButton | ITextArea)[],
  children: React.ReactNode
}
export interface IAddCrudLayout extends IChildren {
  headingText: string,
  actionList?: ICrudAction[],
}
export interface ICrudLayout extends IChildren {
  headingText: any,
  subHeadingText: any,
  actionList?: ICrudAction[],
}

export interface ICrudAction extends ICustomClass {
  actionId?: string,
  actionType: ECrudActionType,
  icon?: any,
  title?: string,
  hrefLink?: string,
  btnSize?: EButtonSize,
  btnVariant?: EButtonVariant,
  textVisibleClasses?: string,
  clickEvent?: any,
  params?: any,
  subActions?: ICrudAction[]
}
// CRUD TABLE
export interface ICrudListingTable {
  tableHeader: ICrudTableHeader[];
  tableActions: ICrudAction[];
  tableData?: Array<any>,
}
export interface ICrudTableHeader {
  cellname: string;
  cellkey: string;
  customclass?: string,
  minWidth?: string;
  maxWidth?: string;
}

// -------------------------
export interface IFieldGroupLayout extends IChildren, ICustomClass {
  title: string,
}

// -------------------------

export interface IAlert extends ICustomClass, IChildren {
  id?: string,
  title?: string,
  message?: string,
  variant?: EAlertTheme,
  isShown?: boolean,
  delay?: number
}
export interface IDataTable {
  tableHeader: Array<any>,
  tableData: Array<ITableData>,
  tableActions: Array<ICrudAction[]> | Array<any[]>,
  dataStatus: IDataStatus,
}
interface ITableData {
  jsxTemplate: Array<ReactNode>,
  cellkey: string,
}

export interface IDataDetailsTable {
  tableHeader: Array<any>,
  tableData: any[],
  tableActions: ICrudAction[] | any[],
  dataStatus: IDataStatus,
}