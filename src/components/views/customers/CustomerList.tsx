import React, { useState, useEffect, ReactNode } from "react";
import { EButtonVariant, EButtonSize, ECrudActionType, EAlertTheme } from "@/components/types/props/enum";
import { FaSearch, FaPlus } from "react-icons/fa";
import { FiEye, FiTrash, FiEdit3, FiRefreshCcw } from "react-icons/fi";
import { ICrudAction, IAlert } from "@/components/types/widgets/interfaces";
import CrudLayout from "@/components/widgets/Forms/layouts/CrudLayout";
import CrudAction from "@/components/widgets/Forms/list/CrudAction";
import TCustomer from "@/app/ts/types/Customer";
import { useLazyQuery, useMutation } from '@apollo/client';
import { READ_CUSTOMERS } from '@/app/graphql/queries/customerQueries';
import { DELETE_CUSTOMER } from '@/app/graphql/mutations/customerMutations';
import { useAppDispatch, useAppSelector } from "@/app/store/redux/hooks";
import { createAlert } from '@/app/store/redux/actions/widgets';
import DataTable from '@/components/widgets/Tables/DataTable';
import { v4 as uuidv4 } from "uuid";
import { IDataStatus } from "@/components/types/props";
import { tableHeaderListing } from './_data/index';


const CustomerList = () => {
  const [getAllCustomers, { data: customerData, loading: customerLoading, error, refetch }] = useLazyQuery(READ_CUSTOMERS); // list customers
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER); // delete customer

  // REDUX
  const dispatch = useAppDispatch();
  const [alertId] = useState(uuidv4());

  // APOLLO MUTATION
  const [customers, setCustomerList] = useState<TCustomer[]>([]); // customer state
  const [dataStatus, setDataStatus] = useState<IDataStatus>({
    isLoading: true,
    count: 0,
    error: {
      message: ''
    },
    empty: "Aucun client!"
  });

  // NOTIFICATION STATE

  // DATA: SET DATA TO STATE
  useEffect(() => {
    if (!customerData) {
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
        setDataStatus((prevState) => ({
          ...prevState,
          isLoading: loading,
          count: dataList.length
        }))
      })
      // !!! ____ error
      .catch((error) => {
        dispatch(createAlert({
          id: alertId,
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
      setCustomerList(customerData.getAllCustomers.data)
    };
    // console.log("customers", customers);

  }, [customerData]);

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
      hrefLink: '/customers/customer-add',
    }
  ];

  //  *** #2. crud (delete/edit/show)
  const dataActionList = ({id_societe}: any): ICrudAction[] => ([
    {
      actionType: ECrudActionType.link,
      title: "Afficher",
      icon: FiEye,
      textVisibleClasses: "hidden 2xl:block",
      customclass: "py-2 px-2.5 ml-1 lg:ml-1.5",
      hrefLink: `/customers/customer-detail/${id_societe}`,
    },
    {
      actionType: ECrudActionType.link,
      title: "Modifier",
      icon: FiEdit3,
      textVisibleClasses: "hidden 2xl:block",
      customclass: "py-2 px-2.5 ml-1 lg:ml-1.5",
      hrefLink: `/customers/customer-edit/${id_societe}`,
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
        await deleteCustomer({
          variables: { id_societe },
          update (cache) {
            console.log('cache', cache);
          }
        }).then(({
          data: {
            deleteCustomer: {
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
            id: alertId,
            isShown: true,
            title: "Succès!",
            message: `Client "${(raison_social?.substring(0, 50))}" Supprimé avec succès!`,
            variant: EAlertTheme.info,
          }));
        }).catch(() => {
          setDataStatus((prevState) => ({
            ...prevState,
            isLoading: false
          }))
          dispatch(createAlert({
            id: alertId,
            isShown: true,
            title: "Erreur!",
            message: `Erreur de suppression!`,
            variant: EAlertTheme.danger,
          }));
        });
      }
    },
  ]);

  // JSX
  return (
    <CrudLayout
      headingText="Clients"
      subHeadingText={`Total clients: ${customers?.length || 0}`}
      actionList={tableActionList}
    >
      <DataTable
        tableHeader={tableHeaderListing}
        dataStatus={dataStatus}
        tableData={[
          {
            cellkey: 'raison_social',
            jsxTemplate: (
              customers.map((item: TCustomer) => (
                <h1 className="font-bold text-theme">{item.raison_social}</h1>
              ))
            ),
          },
          {
            cellkey: 'form_jury',
            jsxTemplate: (
              customers.map((item: TCustomer) => (
                <h1 className="text-theme">{item.form_jury}</h1>
              ))
            ),
          },
          {
            cellkey: 'ville',
            jsxTemplate: (
              customers.map((item: TCustomer) => (
                <h1 className="text-theme">{item.ville}</h1>
              ))
            ),
          },
          {
            cellkey: 'pays',
            jsxTemplate: (
              customers.map((item: TCustomer) => (
                <h1 className="text-theme">{item.pays}</h1>
              ))
            ),
          },
        ]}
        tableActions={
          customers.map((customer: TCustomer) =>
          dataActionList({id_societe: customer.id_societe}).map((action, key) => (
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

export default CustomerList;
