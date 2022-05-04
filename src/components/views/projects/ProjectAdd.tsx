import React from 'react'
import CrudLayout from '@/components/widgets/Forms/layouts/AddCrudLayout';
import { action_list } from '@/components/widgets/Forms/list/_data';
import FieldGroupLayout from '@/components/widgets/Inputs/FieldGroupLayout';


const ProjectAdd: React.FC = () => {
  
  return (
    <CrudLayout headingText="Add Project" actionList={action_list}>
      <FieldGroupLayout title="Client">
        <div className="w-full grid grid-cols-4 gap-3 lg:gap-3">
          {/* {FieldBuilder(projects_fields)} */}
        </div>
      </FieldGroupLayout>
    </CrudLayout>
        
  )
}

export default ProjectAdd