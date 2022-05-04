export const textSizes_enumList: Array<string> = [
  'text-base',
  'text-4xl md:text-5xl lg:text-6xl',
  'text-3xl md:text-4xl lg:text-5xl',
  'text-2xl md:text-3xl lg:text-4xl',
  'text-xl md:text-2xl lg:text-3xl',
  'text-lg md:text-xl lg:text-2xl',
  'text-md md:text-lg lg:text-xl',
  'text-base md:text-md lg:text-lg',
  'text-sm md:text-base lg:text-md',
  'text-sm',
  'text-xs',
];

export const buttonType_enumList: Array<any> = [
  "button",
  "submit",
  "reset",
  undefined
];

export enum EInputKind {
  "text",
  "email",
  "tel",
  "date",
  "number",
  "password",
  "checkbox",
  "radio"
}
export enum EButtonVariant {
  primary = 'btn-primary',
  secondary = 'btn-secondary',
  special = 'btn-special',
  dark = 'btn-dark',
  white = 'btn-white',
  black = 'btn-black',
  primaryOutline = 'btn-primary-outline',
  secondaryOutline = 'btn-secondary-outline',
  darkOutline = 'btn-dark-outline',
  specialOutline = 'btn-special-outline',
  whiteOutline = 'btn-white-outline',
  blackOutline = 'btn-black-outline',
  primaryActive = 'btn-primary-active',
  secondaryActive = 'btn-secondary-active',
  specialActive = 'btn-special-active',
  darkActive = 'btn-dark-active',
  whiteActive = 'btn-white-active',
  blackActive = 'btn-black-active',
}
export enum EButtonSize {
  normal = 'btn',
  xsmall = 'btn-xs',
  small = 'btn-sm',
  large = 'btn-lg',
}

// TABLE ACTION TYPE
export enum ECrudActionType {
  click = 'click',
  link = 'link',
}
// alert
export enum EAlertTheme {
  success = 'alert--green',
  info = 'alert--primary',
  danger = 'alert--red',
  warning = 'alert--yellow',
}