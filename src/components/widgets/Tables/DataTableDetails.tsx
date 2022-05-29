import React, { ReactNode,  useEffect, useState } from 'react'
import Loading1 from '@/components/widgets/global/indicators/Loading1';
import HeadingTitle from '@/components/widgets/Typography/HeadingTitle';
import Button from '@/components/widgets/Buttons/Button';
import { FiRefreshCcw } from 'react-icons/fi';
import { EButtonVariant } from '@/components/types/props/enum';
import ErrorIndicator from "@/components/widgets/global/indicators/ErrorIndicator";
import { IDataDetailsTable } from '@/components/types/widgets/interfaces';

const DataDetailsTable: React.FC<IDataDetailsTable> = ({ tableHeader, tableData, tableActions, dataStatus }) => {
  

  return (
    <table className="crudTable">
      <tbody className="crudTable-tbody / relative">
        {/*** IF STATUS IS LOADING */}
        {dataStatus.isLoading && (
          <tr className="h-20">
            <td colSpan={12} className="w-full h-full">
              <Loading1 isLoading={dataStatus.isLoading} />
            </td>
          </tr>
        )}
        {/*** IF DATA IS AVAILABLE */}
        {!dataStatus.isLoading && !dataStatus.error.message && tableData?.length &&
          tableHeader.map((thead, theadKey) => (
            tableData.map((prop: any, key) => (
              thead.cellkey == prop.cellkey && (
                <tr className="crudTable-tbody-tr" key={key}>
                  <th className="crudTable-tbody-th / w-30 / text-theme text-left">
                    {thead?.cellname}
                  </th>
                  <td className="crudTable-tbody-td / w-70 / text-theme">
                    {prop?.jsxTemplate || "--"}
                  </td>
                </tr>
              )
            ))
          ))
        }
        {/* IF DATA IS NOT AVAILABLE OR THERE IS AN ERROR */}
        {(!dataStatus.isLoading && !dataStatus.error && (!tableData || !tableData.length)) && (
          <tr>
            <td className="w-full" colSpan={12}>
              <div className="flex items-center justify-center gap-3">
                <HeadingTitle text={dataStatus.empty} textSize={7} customclass="text-theme text-center my-9" />
                <Button
                  type={"button"}
                  variant={EButtonVariant.primaryOutline}
                  popTitle={"Actualiser"}
                  customclass="px-2"
                  clickEvent={() => false}
                >
                  <FiRefreshCcw />
                </Button>
              </div>
            </td>
          </tr>
        )}
        {/* IF DATA HAS ERROR */}
        {(dataStatus.error.message && !dataStatus.isLoading && !tableData?.length) && (
          <tr>
            <td className="w-full" colSpan={12}>
              <div className="flex items-center justify-center gap-3">
                <HeadingTitle text={dataStatus.error.message} textSize={7} customclass="text-theme text-center my-9" />
                <Button
                  type={"button"}
                  variant={EButtonVariant.primaryOutline}
                  popTitle={"Actualiser"}
                  customclass="px-2"
                  clickEvent={
                    () => false
                  }
                >
                  <FiRefreshCcw />
                </Button>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default DataDetailsTable
