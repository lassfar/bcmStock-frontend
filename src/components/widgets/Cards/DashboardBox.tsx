import React from 'react'
import { IDashboardBox } from '@/components/types/widgets/interfaces'
import HeadingTitle from '@/components/widgets/Typography/HeadingTitle';
import DynamicIcon from '@/components/widgets/Icons/DynamicIcon';
import { FaBox } from 'react-icons/fa';
import { BiPackage } from 'react-icons/bi';

const DashboardBox: React.FC<IDashboardBox> = ({ text, count, icon, textColor, bgColor, customclass }) => {
  const switchTextColor = (textColor: string): string => {
    switch (textColor) {
      case 'yellow':
        return 'text-yellow-400';
      case 'blue':
        return 'text-blue-400';
      case 'red':
        return 'text-red-400';
      case 'green':
        return 'text-green-400';
      case 'white':
        return 'text-white';
      case 'black':
        return 'text-black';
      default:
        return 'text-white';
    }
  }
  const switchBgColor = (bgColor: string): string => {
    switch (bgColor) {
      case 'yellow':
        return 'bg-yellow-400';
      case 'blue':
        return 'bg-blue-400';
      case 'red':
        return 'bg-red-400';
      case 'green':
        return 'bg-green-400';
      case 'white':
        return 'bg-white';
      case 'black':
        return 'bg-black';
      default:
        return 'bg-black';
    }
  }

  return (
    <div className={`dashboard-box / flex flex-col lg:flex-row items-center gap-3 rounded px-3 py-4 ${switchBgColor(bgColor)} ${customclass}`}>
      <div className="dashboardBox_icon / bg-black w-14 h-14 xl:h-full rounded-md / flex items-center justify-center">
        <DynamicIcon size="2rem" name={icon} customclass={`${switchTextColor(bgColor)}`} />
      </div>
      <div className="dashboardBox_texts / w-auto">
        <HeadingTitle textSize={6} customclass={`font-bold text-center lg:text-left uppercase ${switchTextColor(textColor)} block`} text={text} />
        <HeadingTitle textSize={3} customclass={`font-bold text-center lg:text-left uppercase ${switchTextColor(textColor)} block`} text={count} />
      </div>
    </div>
  )
}

export default DashboardBox