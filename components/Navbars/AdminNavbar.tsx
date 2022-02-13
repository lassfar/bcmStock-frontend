import React from "react";
import HeadingTitle from "@/components/Typography/HeadingTitle";
import Button from '@/components/Buttons/Button';
import DynamicIcon from "@/components/Icons/DynamicIcon";
import * as hiIcon from "react-icons/hi"

const AdminNavbar: React.FC = () => {
  return (
    <div className="admin-navbar / h-14 px-8 py-2 flex items-center shadow-md">
      <div className="w-full md:w-2/4 flex items-center">
        <Button type="button">
          <DynamicIcon name={hiIcon.HiOutlineMenuAlt2} />
        </Button>
        <HeadingTitle typographySize={7} customClass="uppercase font-bold / ml-2">
          Tableau de Bord
        </HeadingTitle>
      </div>
      <div className="w-full md:w-2/4 / flex gap-x-3">
        {/* search */}
        <div className="admin-navbar-search / relative w-52 / bg-white flex items-center focus-within:shadow-sm rounded-md overflow-hidden / px-3 ml-auto">
          <i className="icon w-6" aria-hidden="true">X</i>
          <input type="text" name="" id="" className="w-full h-full text-sm focus:outline-none" />
        </div>
        <div className="">
          <img src="/images/logo/logo-1.png" width={30} height={30} className="rounded-full border-2 border-solid border-blue-100" />
        </div>
      </div>
    </div>
  )
};

export default AdminNavbar;
