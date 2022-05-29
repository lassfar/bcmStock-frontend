import React, { ReactNode } from 'react'
import Loading1 from '@/components/widgets/global/indicators/Loading1';
import HeadingTitle from '@/components/widgets/Typography/HeadingTitle';
import Button from '@/components/widgets/Buttons/Button';
import { FiRefreshCcw } from 'react-icons/fi';
import { EButtonVariant } from '@/components/types/props/enum';
import ErrorIndicator from "@/components/widgets/global/indicators/ErrorIndicator";
import { useEffect, useState } from 'react';
import { IDataTable } from '@/components/types/widgets/interfaces';

const DataTable: React.FC<IDataTable> = ({ tableHeader, tableData, tableActions, dataStatus }) => {

  // useEffect(() => {
  //   console.log("tableActions", tableData[0])
  // }, [tableData])

  return (
    <table className="crudTable">
      <thead className="crudTable-thead">
        <tr className="crudTable-thead-tr">
          {tableHeader.map((thead, key) => (
            <th
              className={`crudTable-thead-th / ${thead.customclass} ${
                (tableHeader.length - 1) == key
                  ? "text-right"
                  : ""
              }`}
              id={`cell-${thead.cellkey}`}
              key={key}
            >
              {thead.cellname}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="crudTable-tbody / relative">
        <React.Fragment>
          {/*** IF STATUS IS LOADING */}
          {dataStatus.isLoading && (
            <tr className="h-20">
              <td colSpan={12} className="w-full h-full">
                <Loading1 isLoading={dataStatus.isLoading} />
              </td>
            </tr>
          )}
          {/*** IF DATA IS AVAILABLE */}
          {!dataStatus.isLoading && !dataStatus.error.message && tableData?.length
            && Array((dataStatus.count)).fill().map((_, rowIndex) => (
            <tr className="crudTable-tbody-tr" key={rowIndex}>
              {tableHeader.map((thead) => (
                tableData?.map((data) => (
                  thead.cellkey == data.cellkey && ( 
                    <td className="crudTable-tbody-td" key={rowIndex}>
                      {data.jsxTemplate[rowIndex]}
                    </td>
                  )
                ))
              ))}
              {/* table actions */}
              <td>
                <div className="flex justify-end">
                  {tableActions[rowIndex]}
                </div>
              </td>
            </tr>
          )) || (!dataStatus.isLoading && !dataStatus.error && (!tableData || !tableData.length)) && (
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
          ) || (dataStatus.error && !dataStatus.isLoading && (!tableData || !tableData?.length)) && (
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
          ) || (
            <tr>
              <td className="w-full" colSpan={12}>
                <div className="flex items-center justify-center gap-3">
                  <HeadingTitle text={"..."} textSize={7} customclass="text-theme text-center my-9" />
                </div>
              </td>
            </tr>
          )}
        </React.Fragment>
      </tbody>
    </table>
  )
}

export default DataTable
