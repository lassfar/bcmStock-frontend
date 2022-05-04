// import React from 'react'
// import { FiRefreshCcw } from 'react-icons/fi';
// import Button from './../Buttons/Button';
// import HeadingTitle from './../Typography/HeadingTitle';

// const DataTable: React.FC<any> = ({dataList, dataStatus}) => {
  
//   // *** #3. customer table body
//   const CustomerDataList = () => {
//     if (dataStatus) {
//       return (
//         <tr>
//           <td>
//             <Loading1 isLoading={dataStatus} />
//           </td>
//         </tr>
//       );
//     }
//     if (!dataStatus && (!dataList || !dataList.length)) {
//       return (
//         <tr>
//           <td className="w-full" colSpan={12}>
//             <div className="flex items-center justify-center gap-3">
//               <HeadingTitle text={'Aucun client!'} textSize={7} customclass="text-theme text-center my-9" />
//               <Button
//                 type={"button"}
//                 variant={EButtonVariant.primaryOutline}
//                 popTitle={"Actualiser"}
//                 customclass="px-2"
//                 clickEvent={() => refetch()}
//               >
//                 <FiRefreshCcw />
//               </Button>
//             </div>
//           </td>
//         </tr>
//       );
//     }
//     else if (!dataStatus && dataList?.length) {
//       return dataList.map((customer: TCustomer, key: any) =>
//         (
//           <tr className="crudTable-tbody-tr" key={key}>
//             <td className="crudTable-tbody-td / text-theme font-bold">
//               {customer.raison_social || "--"}
//             </td>
//             <td className="crudTable-tbody-td / text-theme">
//               {customer.form_jury || "--"}
//             </td>
//             <td className="crudTable-tbody-td / text-theme">
//               {customer.ville || "--"}
//             </td>
//             <td className="crudTable-tbody-td / text-theme">
//               {customer.pays || "--"}
//             </td>
//             <td>
//               <div className="flex justify-end">
//                 {dataActionList({code_societe: customer.code_societe}).map((action, key) => (
//                   <CrudAction
//                     actionType={action.actionType}
//                     icon={action.icon}
//                     title={action.title}
//                     hrefLink={`${action.hrefLink}`}
//                     clickEvent={() => action.clickEvent()}
//                     customclass={action.customclass}
//                     key={key}
//                   />
//                 ))}
//               </div>
//             </td>
//           </tr>
//         )
//       );
//     }
//     else {
//       return (
//         <tr>
//           <td>Error: {error}</td>
//         </tr>
//       );
//     }
//   };

//   return (
//     <table className="crudTable">
//       <thead className="crudTable-thead">
//         <tr className="crudTable-thead-tr">
//           {customerTable.tableHeader.map((thead, key) => (
//             <th
//               className={`crudTable-thead-th / min-w-[${thead.minWidth}] ${
//                 customerTable.tableHeader.length - 1 == key
//                   ? "text-right"
//                   : ""
//               }`}
//               id={`cell-${thead.cellkey}`}
//               key={key}
//             >
//               {thead.cellname}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody className="crudTable-tbody / relative">
//         {/* listing */}
//         <CustomerDataList />
//       </tbody>
//     </table>
//   )
// }

// export default DataTable