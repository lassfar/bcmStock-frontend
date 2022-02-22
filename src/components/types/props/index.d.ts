
import { textSizes_enumList, buttonType_enumList } from './enum';

export interface ICustomClass {
  customclass?: string | JSX
}
export interface IChildren {
  children?: ReactNode,
}
export interface IHeading extends ICustomClass {
  text?: string | number,
  textSize: string | number,
}
enum EtextSize {
  textSizes_enumList
}
enum EButtonType {
  buttonType_enumList
}
export interface IButtonProps extends ICustomClass, IChildren {
  type: EButtonType<HTMLButtonElement>,
  text?: string | number,
  clickEvent?: () => void | any
}
export interface ILink extends ICustomClass, IChildren {
  text?: string | number,
  hrefLink: string | JSX,
  isActive?: boolean,
  clickEvent?: (event: React.MouseEvent<HTMLAnchorElement>) => any
}
export interface IReactIcon extends ICustomClass {
  name: string | JSX,
  size?: string | number,
}