import React from "react";
import HeadingTitle from "@/components/widgets/Typography/HeadingTitle";
import Button from '@/components/widgets/Buttons/Button';
import DynamicIcon from "@/components/widgets/Icons/DynamicIcon";
import { FaBars, FaSearch } from "react-icons/fa";
import { EButtonType, ETextSize } from "@/components/types/props/enum";

const AdminNavbar: React.FC = () => {
  return (
    <div className="admin-navbar / h-14 flex items-center border-b bg-white px-5 md:px-8">
      <div className="w-3/4 flex items-center">
        <Button type={EButtonType.button} customclass={"border border-solid border-gray-300 rounded-sm p-2"}>
          <DynamicIcon name={FaBars} />
        </Button>
        <HeadingTitle textSize={ETextSize.sm} customclass="uppercase font-bold / ml-2">
          Tableau de Bord
        </HeadingTitle>
      </div>
      <div className="w-1/4 flex gap-x-3">
        <div className="ml-auto">
          <img src="/images/logo/logo-1.png" width={30} height={30} className="rounded-full border-2 border-solid border-blue-100" />
        </div>
      </div>
    </div>
  )
};

export default AdminNavbar;
