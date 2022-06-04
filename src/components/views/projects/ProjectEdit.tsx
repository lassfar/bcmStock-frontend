import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
// import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { yupResolver } from "@hookform/resolvers/yup";
import CrudLayout from "@/components/widgets/Forms/layouts/CrudLayout";
import projectValidationSchema from "@/components/views/_helpers/validation/projectValidation";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import SelectBox from "@/components/widgets/Inputs/SelectBox";
import { FaPlusSquare, FaTimesCircle, FaListAlt, FaPlus, FaTimes } from 'react-icons/fa';
import { CREATE_PROJECT } from "@/app/graphql/mutations/projectMutations";
import { ICrudAction, IAlert } from '@/components/types/widgets/interfaces';
import { ECrudActionType, EAlertTheme, EButtonSize, EButtonVariant } from '@/components/types/props/enum';
import Loading1 from '@/components/widgets/global/indicators/Loading1';
import { v4 as uuidv4 } from "uuid";
// REDUX STORE
import { createAlert } from '@/app/store/redux/actions/widgets';
import { useAppDispatch } from '@/app/store/redux/hooks';
import HeadingTitle from "@/components/widgets/Typography/HeadingTitle";
import Button from "@/components/widgets/Buttons/Button";
import { FiPlus, FiTrash, FiEdit } from "react-icons/fi";
import TProject from '@/app/ts/types/Project';
import { initialProjectState } from './_data/initialState';
import { IDataStatus } from './../../types/props/index.d';
import TCustomer from "@/app/ts/types/Customer";
import { READ_CUSTOMERS } from "@/app/graphql/queries/customerQueries";
import { formatValue } from '@/components/views/_helpers/global/functions';
import { defineAlertyTheme } from '@/components/views/_helpers/global/functions';
import TextBox from "@/components/widgets/Inputs/TextBox";
import CrudActionForm from "@/components/widgets/Forms/layouts/CrudActionForm";
import CrudAction from '@/components/widgets/Forms/list/CrudAction';
import { GET_PROJECT } from "@/app/graphql/queries/projectQueries";
import { UPDATE_PROJECT } from "@/app/graphql/mutations/projectMutations";


const ProjectEdit: React.FC = () => {
  // * REDUX
  const dispatch = useAppDispatch();
  // * ROUTER
  const { query } = useRouter();
  // * APOLLO MUTATION
  const [updateProject] = useMutation(UPDATE_PROJECT);
  const [getAllCustomers, { data: customersData, loading: customersLoading, error: customersError, refetch: refetchCustomers }] = useLazyQuery(READ_CUSTOMERS); // list customers
  const [getProject, { data: projectData, loading: projectLoaing, error: projectError, refetch: refetchProject }] = useLazyQuery(GET_PROJECT); // list customers
  // * STATES
  // * project state
  const [projectState, setProjectState] = useState<TProject>({...initialProjectState, ...{ id_project: uuidv4() }});
  // * customer state
  const [customers, setCustomerList] = useState<TCustomer[]>([]); // customer state
  const [customerListSelectOptions, setCustomerListSelectOptions] = useState<any>([]); 
  const [dataStatus, setDataStatus] = useState<IDataStatus>({
    isLoading: true,
    count: 0,
    error: {
      message: '',
    },
    empty: "Aucun projet!"
  });
  // DATA: SET DATA TO STATE
  // CUSTOMERS
  useEffect(() => {
    // ? fetch customers
    if (query.id_project) {
      getAllCustomers()
      // *** ____ success
      .then(({
        loading,
        data: {
          getAllCustomers: {
            data: dataList
          }
        }
      }) => {
        const selectData: any = dataList.map((customer: TCustomer) => ({
          text: customer.raison_social,
          value: customer.id_societe,
        }));
        // fill customers dropdown
        setCustomerListSelectOptions([...selectData])
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
          isLoading: customersLoading,
          error: {
            message: error.message
          }
        }))  
      });
      // $ ***___ FETCH PROJECT ___*** $
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
          }
        }}) => {
        // the set data to state 
        if (data) {
          setProjectState(data);
        }
      })
      // !!! ____ error
      .catch((error) => {
        dispatch(createAlert({
          isShown: true,
          title: "Erreur!",
          message: error.message || `Erreur de modification!`,
          variant: EAlertTheme.danger,
        }));      
      });
    }
    // console.log("customers", customers);
  }, [customersData]);


  // * validations
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors: vError },
    reset,
  } = useForm({
    resolver: yupResolver(projectValidationSchema),
  });
  // * reset fields validation after changing state
  useEffect(() => {
    reset(projectState);
    console.log("projectState", projectState)
  }, [projectState]);


  const setInputValue = (e: React.ChangeEvent<any>) => {
    setProjectState(projectState => ({...projectState,
      [e.target.id]: e.target.value
    }));
    // console.log(`${e.target.id}: value ${e.target.value}`)
  }

  const submitEvent = async () => {
    await updateProject({
      variables: {
        id_project: projectState.id_project,
        input: projectState
      }
    })
    .then(({
      data: {
        updateProject: {
          data: {
            designation
          },
          statusCode
        }
      }
    }) => {
      setProjectState({...initialProjectState, ...{ id_project: uuidv4() }});
      dispatch(createAlert({
        isShown: true,
        title: "Succès!",
        message: `Projet "${formatValue(designation)}" créé avec succès!`,
        variant: defineAlertyTheme(statusCode),
      }));
    })
    .catch((error) => {
      dispatch(createAlert({
        isShown: true,
        title: "Erreur!",
        message: error.message || `Erreur de création!`,
        variant: EAlertTheme.danger,
      }));
      // console.error("===> error gql", error);
    });
    return false;
  };

  useEffect(() => {
    console.log("vError", vError);
  }, [vError])

  const [crudActionList] = useState([
    {
      actionType: ECrudActionType.submit,
      title: 'Modifier',
      icon: FiEdit,
      textVisibleClasses: 'block',
      btnVariant: EButtonVariant.primaryActive,
      btnSize: EButtonSize.normal,
    },
    {
      actionType: ECrudActionType.link,
      title: 'Annuler',
      icon: FaTimes,
      textVisibleClasses: 'block',
      hrefLink: '/projects/project-list',
      btnVariant: EButtonVariant.dangerOutline,
      btnSize: EButtonSize.normal,
    },
  ]);
  

  // JSX
  return (
    <CrudLayout headingText="Ajouter Projet" subHeadingText={'Nouveau Projet'} actionList={actionList}>
      <form
        id="addCustomerForm"
        name="add-projectState-form"
        onSubmit={handleSubmit(submitEvent)}
      >
        <div className="relative / w-full / grid sm:grid-cols-2 lg:grid-cols-12 gap-x-2 gap-y-3 xl:gap-x-6 xl:gap-y-5 pt-2 pb-6">
          <Loading1 loading={dataStatus.isLoading} />
          <TextBox
            label="Code Projet"
            type={"text"}
            id="id_project"
            name="data[projet][id_project]"
            placeholder=""
            customclass={"col-span-12 sm:col-span-1 lg:col-span-6 xl:col-span-6"}
            changeEvent={setInputValue}
            register={register}
            errors={vError.id_project}
            value={projectState.id_project}
            readonly={true}
          />
          <SelectBox
            label="Société"
            id="_id_societe"
            name="data[projet][_id_societe]"
            customclass={"col-span-12 sm:col-span-1 lg:col-span-6 xl:col-span-4"}
            changeEvent={setInputValue}
            register={register}
            errors={vError._id_societe}
            value={projectState._id_societe}
            optionList={customerListSelectOptions}
          />
          <TextBox
            label="Designation"
            type={"text"}
            id="designation"
            name="data[projet][designation]"
            placeholder=""
            customclass={"col-span-12 sm:col-span-2 lg:col-span-6"}
            changeEvent={setInputValue}
            register={register}
            errors={vError.designation}
            value={projectState.designation}
          />
        </div>
        
        {/* FORM ACTION BUTTONS */}
        <CrudActionForm>
          {crudActionList?.map((action, key) => (
            <CrudAction {...action} key={key} />
          ))}
        </CrudActionForm>
      </form>
    </CrudLayout>
  );
};

export default ProjectEdit;


const actionList: ICrudAction[] = [
  {
    actionType: ECrudActionType.link,
    title: 'Liste',
    icon: FaListAlt,
    btnSize: EButtonSize.normal,
    textVisibleClasses: 'hidden lg:block',
    customclass: '',
    hrefLink: '/projects/project-list',
  }
];