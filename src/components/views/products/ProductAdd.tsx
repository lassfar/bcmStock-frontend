import React from 'react'
import TextBox from '@/components/widgets/Inputs/TextBox';
import { FaBox, FaUndo } from 'react-icons/fa';
import HeadingTitle from '@/components/widgets/Typography/HeadingTitle';
import Button from '@/components/widgets/Buttons/Button';
import { BiFilterAlt } from 'react-icons/bi';

const ProductAdd: React.FC = () => {
  return (
    <div className="w-full">
      <div className="formLayout_header / grid grid-cols-4 py-4">
        <HeadingTitle textSize={6} customclass="font-bold text-dark">
          Add Product
        </HeadingTitle>
        <div className="formLayout_headerActions / col-span-3 / flex justify-end">
          <Button type={"button"} customclass="bg-slate-200 rounded ring-2 ring-transparent hover:ring-dark w-8 h-8">
            <BiFilterAlt className="text-dark m-auto"></BiFilterAlt>
          </Button>
        </div>
      </div>
      <div className="formLayout_body / bg-white rounded / border-b-4 border-dark / focus-within:shadow-md shadow px-4 lg:px-8 py-6">
        <form>
          <div className="grid grid-cols-4 gap-3 lg:gap-4">
            <TextBox label="Product Name" id="" name="data[product][code_projet]" />
            <TextBox label="Product Name" id="" name="data[product][designation]" />
            <TextBox label="Product Name" id="" name="data[product][]" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductAdd