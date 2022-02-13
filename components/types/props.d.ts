
import { typographySizes_data } from '@/components/UI/_data/index';
export interface ICustomClassProps {
  customClass?: string | JSX
}
export interface IChildrenProps {
  children?: ReactNode,
}
export interface IHeadingProps extends ICustomClassProps {
  text?: string | number,
  typographySize: string | number,
}
enum ETypographySize {
  typographySizes_data
}
enum EButtonTypes {
  "button",
  "submit",
  "reset",
  undefined
}
export interface IButtonProps extends ICustomClassProps, IChildrenProps {
  type: EButtonTypes<HTMLButtonElement>,
  text?: string | number,
  onClick?: () => void | any
}
export interface IReactIconProps extends ICustomClassProps {
  name: string | JSX,
  size?: string | number,
}
export interface ISidebarDropdownProps {
  text: string,
  icon: string,
  links: [
    {
      text: string,
      icon: string
    }
  ]
}