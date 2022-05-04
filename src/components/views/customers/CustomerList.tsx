import React, { useState, useEffect } from "react";
import { EButtonVariant, EButtonSize, ECrudActionType, EAlertTheme } from "@/components/types/props/enum";
import { FaSearch, FaPlus } from "react-icons/fa";
import { FiEye, FiTrash, FiEdit3, FiRefreshCcw } from "react-icons/fi";
import { ICrudAction, IAlert } from "@/components/types/widgets/interfaces";
import { customerTableStructure } from "@/views/customers/_data";
import CrudLayout from "@/components/widgets/Forms/layouts/CrudLayout";
import CrudAction from "@/components/widgets/Forms/list/CrudAction";
import TCustomer from "@/app/ts/types/Customer";
import Loading1 from '@/components/widgets/global/indicators/Loading1';
import HeadingTitle from "@/components/widgets/Typography/HeadingTitle";
import Alert from '@/components/widgets/global/Alert';
import Button from "@/components/widgets/Buttons/Button";
import { useLazyQuery, useMutation } from '@apollo/client';
import { READ_CUSTOMERS } from '@/app/graphql/queries/customerQueries';
import { DELETE_CUSTOMER } from '@/app/graphql/mutations/customerMutations';
import { useAppDispatch, useAppSelector } from "@/app/store/redux/hooks";
import { selectAlerts, selectAlertById } from '@/app/store/redux/selectors/widgets/alert';
import { createAlert } from '@/app/store/redux/actions/widgets';
import DangerIndicator from "@/components/widgets/global/indicators/DangerIndicator";


const CustomerList = () => {
  const [getAllCustomers, { data, loading, error, refetch }] = useLazyQuery(READ_CUSTOMERS); // list customers
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER); // delete customer

  // REDUX
  const dispatch = useAppDispatch();
  const [alertId] = useState(Date.now().toString());

  // APOLLO MUTATION
  const [customers, setCustomerList] = useState<TCustomer[]>([]); // customer state
  const customerTable = customerTableStructure; // customer table structure (header+actions)
  const [isLoading, setLoading] = useState(loading);

  // NOTIFICATION STATE

  // DATA: SET DATA TO STATE
  useEffect(() => {
    (!data) ? getAllCustomers() : setCustomerList(data.getAllCustomers);
    // console.log("customers", customers);
  }, [data]);

  // *** #1. table main actions (search...)
  const tableActionList: ICrudAction[] = [
    {
      actionType: ECrudActionType.click,
      title: 'Refraîchir',
      icon: FiRefreshCcw,
      btnSize: EButtonSize.normal,
      textVisibleClasses: 'hidden lg:block',
      customclass: 'mr-1',
      clickEvent: () => refetch()
    },
    {
      actionType: ECrudActionType.click,
      title: 'Recherche',
      icon: FaSearch,
      btnSize: EButtonSize.normal,
      textVisibleClasses: 'hidden lg:block',
      customclass: 'mr-1',
      clickEvent: () => { console.log('filter btn') }
    },
    {
      actionType: ECrudActionType.link,
      title: 'Nouveau',
      icon: FaPlus,
      btnSize: EButtonSize.normal,
      textVisibleClasses: 'hidden lg:block',
      customclass: 'mr-0',
      hrefLink: '/customers/customer-add',
    }
  ];

  //  *** #2. crud (delete/edit/show)
  const dataActionList = ({code_societe}: any): ICrudAction[] => ([
    {
      actionType: ECrudActionType.link,
      title: "Afficher",
      icon: FiEye,
      textVisibleClasses: "hidden 2xl:block",
      customclass: "py-2 px-2.5 ml-1 lg:ml-1.5",
      hrefLink: `/customers/customer-detail/${code_societe}`,
    },
    {
      actionType: ECrudActionType.link,
      title: "Modifier",
      icon: FiEdit3,
      textVisibleClasses: "hidden 2xl:block",
      customclass: "py-2 px-2.5 ml-1 lg:ml-1.5",
      hrefLink: `/customers/customer-edit/${code_societe}`,
    },
    {
      actionType: ECrudActionType.click,
      title: "Supprimer",
      icon: FiTrash,
      textVisibleClasses: "hidden 2xl:block",
      customclass: "py-2 px-2.5 ml-1 lg:ml-1.5",
      clickEvent: async () => {
        setLoading(true);
        // alert(`code societe delete ${code_societe}`)
        await deleteCustomer({
          variables: { code_societe },
          update (cache) {
            console.log('cache', cache);
          }
        }).then(({
          data: {
            deleteCustomer: { raison_social }
          }
        }) => {
          console.log("data", data);
          setLoading(false);
          dispatch(createAlert({
            id: alertId,
            isShown: true,
            title: "Succès!",
            message: `Client "${(raison_social?.substring(0, 50))}" Supprimé avec succès!`,
            variant: EAlertTheme.info,
          }));
        }).catch(() => {
          setLoading(false);
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

  // *** #3. customer table body
  const CustomerDataList = () => {
    if (isLoading) {
      return (
        <tr>
          <td>
            <Loading1 isLoading={isLoading} />
          </td>
        </tr>
      );
    }
    if (!isLoading && !error && (!customers || !customers.length)) {
      return (
        <tr>
          <td className="w-full" colSpan={12}>
            <div className="flex items-center justify-center gap-3">
              <HeadingTitle text={'Aucun client!'} textSize={7} customclass="text-theme text-center my-9" />
              <Button
                type={"button"}
                variant={EButtonVariant.primaryOutline}
                popTitle={"Actualiser"}
                customclass="px-2"
                clickEvent={() => refetch()}
              >
                <FiRefreshCcw />
              </Button>
            </div>
          </td>
        </tr>
      );
    }
    else if (!isLoading && customers?.length) {
      return customers.map((customer: TCustomer, key: any) =>
        (
          <tr className="crudTable-tbody-tr" key={key}>
            <td className="crudTable-tbody-td / text-theme font-bold">
              {customer.raison_social || "--"}
            </td>
            <td className="crudTable-tbody-td / text-theme">
              {customer.form_jury || "--"}
            </td>
            <td className="crudTable-tbody-td / text-theme">
              {customer.ville || "--"}
            </td>
            <td className="crudTable-tbody-td / text-theme">
              {customer.pays || "--"}
            </td>
            <td>
              <div className="flex justify-end">
                {dataActionList({code_societe: customer.code_societe}).map((action, key) => (
                  <CrudAction
                    actionType={action.actionType}
                    icon={action.icon}
                    title={action.title}
                    hrefLink={`${action.hrefLink}`}
                    clickEvent={() => action.clickEvent()}
                    customclass={action.customclass}
                    key={key}
                  />
                ))}
              </div>
            </td>
          </tr>
        )
      );
    }
    else if (error && !isLoading && !customers?.length) {
      return (
        <tr>
          <td className="w-full" colSpan={12}>
            <div className="flex items-center justify-center gap-3">
              <HeadingTitle text={error.message} textSize={7} customclass="text-theme text-center my-9" />
              <Button
                type={"button"}
                variant={EButtonVariant.primaryOutline}
                popTitle={"Actualiser"}
                customclass="px-2"
                clickEvent={() => refetch()}
              >
                <FiRefreshCcw />
              </Button>
            </div>
          </td>
        </tr>
      );
    }
  };

  // JSX
  return (
    <CrudLayout
      headingText="Clients"
      subHeadingText={`Total clients: ${customers?.length || 0}`}
      actionList={tableActionList}
    >
      <table className="crudTable">
        <thead className="crudTable-thead">
          <tr className="crudTable-thead-tr">
            {customerTable.tableHeader.map((thead, key) => (
              <th
                className={`crudTable-thead-th / min-w-[${thead.minWidth}] ${
                  customerTable.tableHeader.length - 1 == key
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
          {/* listing */}
          <CustomerDataList />
        </tbody>
      </table>
    </CrudLayout>
  );
};

export default CustomerList;