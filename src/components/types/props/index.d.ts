
import { textSizes_enumList } from './enum';
import { EButtonVariant, EButtonSize, EButtonType } from '@/components/types/props/enum';

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
enum ETextSize {
  textSizes_enumList
}
export interface IButtonProps extends ICustomClass, IChildren {
  type: EButtonType,
  text?: string | number,
  popTitle?: string,
  variant?: EButtonVariant,
  size?: EButtonSize,
  leadingIcon?: any,
  tealingIcon?: any,
  clickEvent?: any,
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

export interface IDataStatus {
  count: number,
  isLoading: boolean,
  error: {
    message: string,
  },
  empty?: string,
}