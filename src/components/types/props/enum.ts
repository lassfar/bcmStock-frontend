export enum ETextSize {
  x8 = 'text-4xl md:text-5xl lg:text-6xl',
  x7 = 'text-3xl md:text-4xl lg:text-5xl',
  x6 = 'text-2xl md:text-3xl lg:text-4xl',
  x5 = 'text-xl md:text-2xl lg:text-3xl',
  x4 = 'text-lg md:text-xl lg:text-2xl',
  x3 = 'text-md md:text-lg lg:text-xl',
  x2 = 'text-base md:text-md lg:text-lg',
  x1 = 'text-sm md:text-base lg:text-md',
  base = 'text-base',
  sm = 'text-sm',
  xs = 'text-xs',
};

export enum EButtonType {
  button = "button",
  submit = "submit",
  reset = "reset",
  undefined = "undefined"
}

export enum EInputKind {
  text = "text",
  email = "email",
  tel = "tel",
  date = "date",
  number = "number",
  password = "password",
  checkbox = "checkbox",
  radio = "radio"
}
export enum EButtonVariant {
  primary = 'btn-primary',
  secondary = 'btn-secondary',
  danger = 'btn-danger',
  special = 'btn-special',
  dark = 'btn-dark',
  white = 'btn-white',
  black = 'btn-black',
  transparent = 'btn-transparent',
  primaryOutline = 'btn-primary-outline',
  dangerOutline = 'btn-danger-outline',
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
  menu = 'menu',
  submit = 'submit',
}
// alert
export enum EAlertTheme {
  success = 'alert--green',
  info = 'alert--primary',
  danger = 'alert--red',
  warning = 'alert--yellow',
}