import React, { useState, useEffect } from "react";
import { EButtonVariant, EButtonSize, ECrudActionType, EAlertTheme } from "@/components/types/props/enum";
import { FaSearch, FaPlus } from "react-icons/fa";
import { FiEye, FiTrash, FiEdit3, FiRefreshCcw, FiCopy } from "react-icons/fi";
import { ICrudAction, IAlert } from "@/components/types/widgets/interfaces";
import CrudLayout from "@/components/widgets/Forms/layouts/CrudLayout";
import CrudAction from "@/components/widgets/Forms/list/CrudAction";
import TProject from "@/app/ts/types/Project";
import { useLazyQuery, useMutation } from '@apollo/client';
import { READ_PROJECTS } from '@/app/graphql/queries/projectQueries';
import { DELETE_PROJECT } from '@/app/graphql/mutations/projectMutations';
import { useAppDispatch, useAppSelector } from "@/app/store/redux/hooks";
import { createAlert } from '@/app/store/redux/actions/widgets';
import DataTable from '@/components/widgets/Tables/DataTable';
import { v4 as uuidv4 } from "uuid";
import { IDataStatus } from "@/components/types/props";
import { projectTableHeaderListing } from './_data/index';
import Button from "@/components/widgets/Buttons/Button";
import { EButtonType } from '@/components/types/props/enum';
import { copyToClipboard } from "../_helpers/global/functions";

const ProjectList = () => {
  const [getAllProjects, { data: projectData, loading: projectLoading, error, refetch }] = useLazyQuery(READ_PROJECTS); // list projects
  const [deleteProject] = useMutation(DELETE_PROJECT); // delete customer

  // REDUX
  const dispatch = useAppDispatch();

  // APOLLO MUTATION
  const [projects, setCustomerList] = useState<TProject[]>([]); // customer state
  const [dataStatus, setDataStatus] = useState<IDataStatus>({
    isLoading: true,
    count: 0,
    error: {
      message: ''
    },
    empty: "Aucun projet!"
  });

  // DATA: SET DATA TO STATE
  useEffect(() => {
    if (!projectData) {
      getAllProjects()
      // *** ____ success
      .then(({
        loading,
        data: {
          getAllProjects: {
            data: dataList
          }
        }
      }) => {
        setDataStatus((prevState) => ({
          ...prevState,
          isLoading: loading,
          count: dataList.length
        }))
      })
      // !!! ____ error
      .catch((error) => {
        dispatch(createAlert({
          isShown: true,
          title: "Erreur!",
          message: error.message || `Erreur inconnue!`,
          variant: EAlertTheme.danger,
        }));    
        setDataStatus((prevState) => ({
          ...prevState,
          isLoading: false,
          error: {
            message: error.message || `Erreur inconnue!`
          }
        }))  
      });
    } else {
      setCustomerList(projectData.getAllProjects.data)
    };
    // console.log("projects", projects);

  }, [projectData]);

  // *** #1. table main actions (search...)
  const tableActionList: ICrudAction[] = [
    {
      actionType: ECrudActionType.click,
      title: 'Refraîchir',
      icon: FiRefreshCcw,
      btnSize: EButtonSize.normal,
      textVisibleClasses: 'hidden lg:block',
      customclass: 'py-2 px-2.5 ml-1 lg:ml-1.5',
      clickEvent: () => refetch()
    },
    {
      actionType: ECrudActionType.click,
      title: 'Recherche',
      icon: FaSearch,
      btnSize: EButtonSize.normal,
      textVisibleClasses: 'hidden lg:block',
      customclass: 'py-2 px-2.5 ml-1 lg:ml-1.5',
      clickEvent: () => { console.log('filter btn') }
    },
    {
      actionType: ECrudActionType.link,
      title: 'Nouveau',
      icon: FaPlus,
      btnSize: EButtonSize.normal,
      textVisibleClasses: 'hidden lg:block',
      customclass: 'py-2 px-2.5 ml-1 lg:ml-1.5',
      hrefLink: '/projects/project-add',
    }
  ];

  //  *** #2. crud (delete/edit/show)
  const dataActionList = ({id}: any): ICrudAction[] => ([
    {
      actionType: ECrudActionType.link,
      title: "Afficher",
      icon: FiEye,
      textVisibleClasses: "hidden 2xl:block",
      customclass: "py-2 px-2.5 ml-1 lg:ml-1.5",
      hrefLink: `/projects/project-detail/${id}`,
    },
    {
      actionType: ECrudActionType.link,
      title: "Modifier",
      icon: FiEdit3,
      textVisibleClasses: "hidden 2xl:block",
      customclass: "py-2 px-2.5 ml-1 lg:ml-1.5",
      hrefLink: `/projects/project-edit/${id}`,
    },
    {
      actionType: ECrudActionType.click,
      title: "Supprimer",
      icon: FiTrash,
      textVisibleClasses: "hidden 2xl:block",
      customclass: "py-2 px-2.5 ml-1 lg:ml-1.5",
      clickEvent: async () => {
        setDataStatus((prevState) => ({
          ...prevState,
          isLoading: true
        }))
        await deleteProject({
          variables: { id },
          update (cache) {
            console.log('cache', cache);
          }
        }).then(({
          data: {
            deleteProject: {
              data: {
                designation
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
            message: `Client "${(designation?.substring(0, 50))}" Supprimé avec succès!`,
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
    },
  ]);

  const copyText = (id: any) => {
    const copiedMsgElem = document.querySelector(`#idProjectCopied${id}`);
    copyToClipboard(`#idProjectInput${id}`)
    copiedMsgElem?.classList.add('block');
    copiedMsgElem?.classList.remove('hidden');
    setTimeout(()  => {
      copiedMsgElem?.classList.remove('block');
      copiedMsgElem?.classList.add('hidden');
    }, 1000);
  }

  // JSX
  return (
    <CrudLayout
      headingText="Projets"
      subHeadingText={`Total projets: ${projects?.length || 0}`}
      actionList={tableActionList}
    >
      <DataTable
        tableHeader={projectTableHeaderListing}
        dataStatus={dataStatus}
        tableData={[
          {
            cellkey: 'id_project',
            jsxTemplate: (
              projects.map((item: TProject) => (
                <div className="font-bold text-theme relative">
                  <div className="flex items-center">
                    <Button type={EButtonType.button} clickEvent={() => copyText(item.id_project)} popTitle={"Copier"}>
                      <FiCopy />
                    </Button>
                    <input className="block bg-transparent text-theme w-20" id={`idProjectInput${item.id_project}`} value={item?.id_project as string} readOnly={true} />
                  </div>
                  <small id={`idProjectCopied${item.id_project}`} className="hidden w-full text-theme absolute">Copié</small>
                </div>
              ))
            ),
          },
          {
            cellkey: 'designation',
            jsxTemplate: (
              projects.map((item: TProject) => (
                <h1 className="text-theme">{item?.designation}</h1>
              ))
            ),
          },
          {
            cellkey: 'client',
            jsxTemplate: (
              projects.map((item: TProject) => (
                <span className="text-theme">{item?.Customer?.raison_social}</span>
              ))
            ),
          },
        ]}
        tableActions={
          projects.map((item: TProject) =>
          dataActionList({id: item?.id_project}).map((action, key) => (
            <CrudAction
              actionType={action.actionType}
              icon={action.icon}
              title={action.title}
              hrefLink={`${action.hrefLink}`}
              clickEvent={() => action.clickEvent()}
              customclass={action.customclass}
              key={key}
            />
          )))}
      />
    </CrudLayout>
  );
};

export default ProjectList;
