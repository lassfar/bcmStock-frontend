import { EAlertTheme } from '@/components/types/props/enum';


export const formatValue = (val :any) => {
  if (!val) return "";
  return val;
}

export const regExps = {
  phone: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
}

export const defineAlertyTheme = (level: number | string) => {
  switch(level) {
    case 1:
      return EAlertTheme.success
    case 2:
      return EAlertTheme.info
    case 3:
      return EAlertTheme.warning
    case 4:
      return EAlertTheme.danger
    default:
      return EAlertTheme.info
  }
}

export const copyToClipboard = (selector: string) => {
  let targetElement = document.querySelector(selector) as any;
  if (targetElement) {
    targetElement.select();
    document.execCommand("copy");
    return targetElement.value
  }
  return null
}