import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import CrudLayout from "@/components/widgets/Forms/layouts/CrudLayout";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import TProject from "@/app/ts/types/Project";
import { GET_PROJECT } from "@/app/graphql/queries/projectQueries";
import { DELETE_PROJECT } from "@/app/graphql/mutations/projectMutations";
import { ICrudAction } from '@/components/types/widgets/interfaces';
import { ECrudActionType, EAlertTheme, EButtonSize } from '@/components/types/props/enum';
import { defineAlertyTheme, formatValue } from "@/components/views/_helpers/global/functions";
import { createAlert } from '@/app/store/redux/actions/widgets';
import { useAppDispatch } from '@/app/store/redux/hooks';
import { initialProjectState } from './_data/initialState';
import { FiDelete, FiEdit, FiPlus, FiTrash, FiEdit3, FiRefreshCcw, FiEye, FiMenu, FiMoreHorizontal } from "react-icons/fi";
import { FaPlus } from 'react-icons/fa';
import { IDataStatus } from '@/components/types/props';
import DataDetailsTable from "@/components/widgets/Tables/DataTableDetails";
import Link from 'next/link';
import { projectTableHeaderDetails } from "./_data";


const ProjectDetail: React.FC = () => {
  // * REDUX
  const dispatch = useAppDispatch();
  // * router
  const { query } = useRouter();
  // * customer state
  const [projectState, setProjectState] = useState<TProject>({...initialProjectState});
  // * customer mutation
  const [getProject, { data: projectData, loading: projectLoading, error: projectError, refetch: refetchProject }] = useLazyQuery(GET_PROJECT); // list customers
  const [deleteProject] = useMutation(DELETE_PROJECT); // delete customer
  
  // DATA STATUS
  const [dataStatus, setDataStatus] = useState<IDataStatus>({
    isLoading: true,
    count: 0,
    error: {
      message: ''
    },
    empty: "Aucun project!"
  });


  useEffect(() => {
    // console.log("query id_project", query.id_project)
    if (query.id_project) {
      getProject({
        variables: {
          id_project: query.id_project,
        },
      })
      // *** success
      .then(({ 
        data: { 
          getProject: {
            data,
          },
          loading
        }}) => {
        // the set data to state
        if (data) {
          setProjectState({...data});
          setDataStatus((prevState) => ({
            ...prevState,
            isLoading: loading,
            count: Object.values(data).length
          }))
        }
      })
      // !!! ____ error
      .catch((error) => {
        dispatch(createAlert({
          isShown: true,
          title: "Erreur!",
          message: error.message || `Erreur inconnue!`,
          variant: EAlertTheme.danger,
        }));      
      });
    }
  }, [query.id_project])
  

  const crudActions = ({id_project}: any): ICrudAction[] => ([
    {
      actionType: ECrudActionType.click,
      title: 'Refraîchir',
      icon: FiRefreshCcw,
      btnSize: EButtonSize.normal,
      textVisibleClasses: 'hidden 2xl:block',
      customclass: 'py-2 px-2.5 ml-1 lg:ml-1.5',
      clickEvent: () => refetchProject()
    },
    {
      actionType: ECrudActionType.link,
      title: 'Liste',
      icon: FiMenu,
      btnSize: EButtonSize.normal,
      textVisibleClasses: 'hidden 2xl:block',
      customclass: 'py-2 px-2.5 ml-1 lg:ml-1.5',
      hrefLink: '/customers/customer-list',
    },
    {
      actionId: `action-${id_project}`,
      actionType: ECrudActionType.menu,
      textVisibleClasses: 'hidden 2xl:block',
      icon: FiMoreHorizontal,
      btnSize: EButtonSize.normal,
      customclass: 'py-2 px-2.5 ml-1 lg:ml-1.5',
      subActions: [
        {
          actionType: ECrudActionType.link,
          title: 'Nouveau',
          icon: FaPlus,
          btnSize: EButtonSize.normal,
          textVisibleClasses: 'hidden 2xl:block',
          customclass: 'py-2 px-2.5 ml-1 lg:ml-1.5',
          hrefLink: '/customers/customer-add',
        },
        {
          actionType: ECrudActionType.link,
          title: "Modifier",
          icon: FiEdit3,
          textVisibleClasses: "hidden 2xl:block",
          customclass: "py-2 px-2.5 ml-1 lg:ml-1.5",
          hrefLink: `/customers/customer-edit/${id_project}`,
        },
        {
          actionType: ECrudActionType.click,
          title: "Supprimer",
          icon: FiTrash,
          textVisibleClasses: "hidden 2xl:block",
          customclass: "py-2 px-2.5 ml-1 lg:ml-1.5",
          clickEvent: () => {
            deleteCustomerAction({id_project: id_project})
          }
        },
      ]
    },
  ]);

  const deleteCustomerAction = async ({id_project}: any) => {
    setDataStatus((prevState) => ({
      ...prevState,
      isLoading: true
    }))
    await deleteProject({
      variables: { id_project },
      update (cache) {
        console.log('cache', cache);
      }
    }).then(({
      data: {
        deleteProject: {
          data: {
            raison_social
          }
        }
      }
    }) => {
      setDataStatus((prevState) => ({
        ...prevState,
        isLoading: false
      }))
      dispatch(createAlert({
        isShown: true,
        title: "Succès!",
        message: `Projet "${formatValue(projectState.designation)}" Supprimé avec succès!`,
        variant: EAlertTheme.info,
      }));
    }).catch(() => {
      setDataStatus((prevState) => ({
        ...prevState,
        isLoading: false
      }))
      dispatch(createAlert({
        isShown: true,
        title: "Erreur!",
        message: `Erreur de suppression!`,
        variant: EAlertTheme.danger,
      }));
    });
  }

  // ******************************************************************************
  // * JSX ________________________________________________________________________
  // ******************************************************************************
  return (
    <CrudLayout
      headingText="Détails Projet"
      subHeadingText={`Projet ${projectState.designation}`}
      actionList={crudActions({id_project: projectState.id_project})}
    >
      <DataDetailsTable
        dataStatus={dataStatus}
        tableHeader={projectTableHeaderDetails}
        tableData={[
          {
            cellkey: 'id_project',
            jsxTemplate: (projectState.id_project),
          },
          {
            cellkey: 'designation',
            jsxTemplate: (projectState.designation),
          },
          {
            cellkey: 'client',
            jsxTemplate: (projectState?.Customer?.raison_social),
          },
          // {
          //   cellkey: 'commercials',
          //   jsxTemplate: (
          //     <Link href={"/commercials/commercial-list"}>
          //       <a className="font-bold text-theme">
          //         {"Voir commercials"}
          //       </a>
          //     </Link>
          //   ),
          // },
        ]}
        tableActions={crudActions({
          id_project: projectState.id_project
        })}
      />
      {/* END DATA DETAILS TABLE  */}
    </CrudLayout>
  );
};

export default ProjectDetail;
