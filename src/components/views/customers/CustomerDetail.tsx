import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { yupResolver } from "@hookform/resolvers/yup";
import CrudLayout from "@/components/widgets/Forms/layouts/CrudLayout";
import customerValidationSchema from "@/components/views/_helpers/validation/customerValidation";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import TCustomer from "@/app/ts/types/Customer";
import TextBox from "@/components/widgets/Inputs/TextBox";
import SelectBox from "@/components/widgets/Inputs/SelectBox";
import { country_list } from "@/views/customers/_data/countries"
import TextArea from '@/components/widgets/Inputs/TextArea';
import { FaPlusSquare, FaTimesCircle, FaListAlt } from 'react-icons/fa';
import { DELETE_CUSTOMER, UPDATE_CUSTOMER } from "@/app/graphql/mutations/customerMutations";
import { ICrudAction, IAlert } from '@/components/types/widgets/interfaces';
import { ECrudActionType, EAlertTheme, EButtonSize } from '@/components/types/props/enum';
import Loading1 from "@/components/widgets/global/indicators/Loading1";
import { GET_CUSTOMER } from "@/app/graphql/queries/customerQueries";
import { useRouter } from 'next/router';
import Alert from "@/components/widgets/global/Alert";
import { defineAlertyTheme, formatValue } from "@/components/views/_helpers/global/functions";
import { createAlert } from '@/app/store/redux/actions/widgets';
import { useAppDispatch } from '@/app/store/redux/hooks';
import { v4 as uuidv4 } from "uuid";
import { initialCustomer } from './_data/initialState';
import ErrorIndicator from "@/components/widgets/global/indicators/ErrorIndicator";
import { FiDelete, FiEdit, FiPlus, FiTrash, FiEdit3, FiRefreshCcw, FiEye, FiMenu, FiMoreHorizontal } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import HeadingTitle from '@/components/widgets/Typography/HeadingTitle';
import TCommercial from '@/app/ts/types/Commercial';
import CrudAction from "@/components/widgets/Forms/list/CrudAction";
import Button from '@/components/widgets/Buttons/Button';
import { EButtonVariant } from '@/components/types/props/enum';
import { initialCommercialState } from './../commercials/initialState';
import { FaPlus } from 'react-icons/fa';
import { IDataStatus } from '@/components/types/props';
import DataDetailsTable from "@/components/widgets/Tables/DataTableDetails";
import Link from 'next/link';
import { tableHeaderDetails } from "./_data";

const countryList: any[] = [];
country_list.forEach(country => {
  countryList.push({
    text: country.name,
    value: country.code,
  });
});


const CustomerDetail: React.FC = () => {
  // * REDUX
  const dispatch = useAppDispatch();
  // * router
  const { query } = useRouter();
  // * customer state
  const [customerState, setCustomerState] = useState<TCustomer>({...initialCustomer});
  // * customer mutation
  const [getCustomer, { data: customerData, loading: customerLoading, error: customerError, refetch }] = useLazyQuery(GET_CUSTOMER);
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER); // delete customer

  const [alertId] = useState(uuidv4());
  
  // DATA STATUS
  const [dataStatus, setDataStatus] = useState<IDataStatus>({
    isLoading: true,
    count: 0,
    error: {
      message: ''
    },
    empty: "Aucun client!"
  });


  useEffect(() => {
    // console.log("query id_societe", query.id_societe)
    if (query.id_societe) {
      getCustomer({
        variables: {
          id_societe: query.id_societe,
        },
      })
      // *** success
      .then(({ 
        data: { 
          getCustomer: {
            data,
          },
          loading
        }}) => {
        // the set data to state
        if (data) {
          setCustomerState({...data});
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
  }, [query.id_societe])

  // crud table actions  
  const crudActions = ({id_societe}: any): ICrudAction[] => ([
    {
      actionType: ECrudActionType.click,
      title: 'Refraîchir',
      icon: FiRefreshCcw,
      btnSize: EButtonSize.normal,
      textVisibleClasses: 'hidden 2xl:block',
      customclass: 'py-2 px-2.5 ml-1 lg:ml-1.5',
      clickEvent: () => refetch()
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
      actionId: `action-${id_societe}`,
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
          hrefLink: `/customers/customer-edit/${id_societe}`,
        },
        {
          actionType: ECrudActionType.click,
          title: "Supprimer",
          icon: FiTrash,
          textVisibleClasses: "hidden 2xl:block",
          customclass: "py-2 px-2.5 ml-1 lg:ml-1.5",
          clickEvent: () => {
            deleteCustomerAction({id_societe: id_societe})
          }
        },
      ]
    },
  ]);

  const deleteCustomerAction = async ({id_societe}: any) => {
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

  // ******************************************************************************
  // * JSX ________________________________________________________________________
  // ******************************************************************************
  return (
    <CrudLayout
      headingText="Détails Client"
      subHeadingText={`Client ${customerState.raison_social}`}
      actionList={crudActions({id_societe: customerState.id_societe})}
    >
      {/* crudActions({id_societe: query.id_societe}) */}
      <DataDetailsTable
        dataStatus={dataStatus}
        tableHeader={tableHeaderDetails}
        tableData={[
          {
            cellkey: 'id_societe',
            jsxTemplate: (customerState.id_societe),
          },
          {
            cellkey: 'raison_social',
            jsxTemplate: (customerState.raison_social),
          },
          {
            cellkey: 'form_jury',
            jsxTemplate: (customerState.form_jury),
          },
          {
            cellkey: 'ice',
            jsxTemplate: (customerState.ice),
          },
          {
            cellkey: 'region',
            jsxTemplate: (customerState.region),
          },
          {
            cellkey: 'chef_chantier',
            jsxTemplate: (customerState.chef_chantier),
          },
          {
            cellkey: 'tel_chef_chantier',
            jsxTemplate: (customerState.tel_chef_chantier),
          },
          {
            cellkey: 'gerant',
            jsxTemplate: (customerState.gerant),
          },
          {
            cellkey: 'tel_gerant',
            jsxTemplate: (customerState.tel_gerant),
          },
          {
            cellkey: 'n_compte',
            jsxTemplate: (customerState.n_compte),
          },
          {
            cellkey: 'tel_societe',
            jsxTemplate: (customerState.tel_societe),
          },
          {
            cellkey: 'fax',
            jsxTemplate: (customerState.fax),
          },
          {
            cellkey: 'courriel',
            jsxTemplate: (customerState.courriel),
          },
          {
            cellkey: 'adresse_facture',
            jsxTemplate: (customerState.adresse_facture),
          },
          {
            cellkey: 'zipcode',
            jsxTemplate: (customerState.zipcode),
          },
          {
            cellkey: 'ville',
            jsxTemplate: (customerState.ville),
          },
          {
            cellkey: 'pays',
            jsxTemplate: (customerState.pays),
          },
          {
            cellkey: 'adresse_livraison',
            jsxTemplate: (customerState.adresse_livraison),
          },
          {
            cellkey: 'zipcode_livraison',
            jsxTemplate: (customerState.zipcode_livraison),
          },
          {
            cellkey: 'ville_livraison',
            jsxTemplate: (customerState.ville_livraison),
          },
          {
            cellkey: 'pays_livraison',
            jsxTemplate: (customerState.pays_livraison),
          },
          {
            cellkey: 'client_status',
            jsxTemplate: (customerState.client_status),
          },
          {
            cellkey: 'raison_blocage',
            jsxTemplate: (customerState.raison_blocage),
          },
          {
            cellkey: 'notes',
            jsxTemplate: (customerState.notes),
          },
          {
            cellkey: 'solubilite',
            jsxTemplate: (customerState.solubilite),
          },
          {
            cellkey: 'plafond_accorde',
            jsxTemplate: (customerState.plafond_accorde),
          },
          {
            cellkey: 'commercials',
            jsxTemplate: (
              <Link href={"/commercials/commercial-list"}>
                <a className="font-bold text-theme">
                  {"Voir commercials"}
                </a>
              </Link>
            ),
          },
        ]}
        tableActions={crudActions({
          id_societe: customerState.id_societe
        })}
      />
      {/* END DATA DETAILS TABLE  */}
    </CrudLayout>
  );
};

export default CustomerDetail;
