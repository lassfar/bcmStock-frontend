import React, { ReactNode } from 'react'
import { ICrudAction } from '@/components/types/widgets/interfaces';
import CrudAction from '@/components/widgets/Forms/list/CrudAction';

const CrudActionForm: React.FC<ReactNode> = ({ children }) => {
// const CrudActionForm: React.FC<ICrudAction[]> = ({ ...crudActionList }) => {
  
  // React.useEffect(() => {
  //   console.log("crudActionList", crudActionList);
  // }, [crudActionList])

  return (
    <div className="form-action-group / w-full flex items-start justify-center gap-3 py-3 / rounded-md bg-zinc-200 dark:bg-black/20">
      {/* {crudActionList?.length && crudActionList.map((action, key) => (
        <CrudAction {...action} key={key} />
      ))} */}
      {children}
    </div>
  )
}

export default CrudActionForm