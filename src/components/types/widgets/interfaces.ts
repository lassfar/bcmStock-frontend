import { EButtonType, IChildren } from "../props";
import { ICustomClass } from './../props/index.d';

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
export interface ISidebarDropdownButton extends ICustomClass, IChildren {
  text?: string,
  icon?: any,
  isActive?: boolean,
  clickEvent?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => any,
}