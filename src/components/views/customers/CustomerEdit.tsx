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
import { FaPlusSquare, FaTimesCircle, FaListAlt, FaTimes } from 'react-icons/fa';
import { UPDATE_CUSTOMER } from "@/app/graphql/mutations/customerMutations";
import { ICrudAction, IAlert } from '@/components/types/widgets/interfaces';
import { ECrudActionType, EAlertTheme, EButtonSize, EButtonVariant } from '@/components/types/props/enum';
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
import { FiDelete, FiEdit, FiPlus, FiTrash } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import HeadingTitle from '@/components/widgets/Typography/HeadingTitle';
import TCommercial from './../../../app/ts/types/Commercial';
import CrudAction from "@/components/widgets/Forms/list/CrudAction";
import Button from '@/components/widgets/Buttons/Button';
import { initialCommercialState } from './../commercials/initialState';
import { MdClose } from "react-icons/md";
import { EButtonType } from '@/components/types/props/enum';
import CrudActionForm from './../../widgets/Forms/layouts/CrudActionForm';

const countryList: any[] = [];
country_list.forEach(country => {
  countryList.push({
    text: country.name,
    value: country.code,
  });
});


const CustomerEdit: React.FC = () => {
  // * REDUX
  const dispatch = useAppDispatch();
  // * router
  const { query } = useRouter();
  const router = useRouter();
  // * customer state
  const [customerState, setCustomerState] = useState<TCustomer>({...initialCustomer});
  const [commercialState, setCommercialState] = useState<TCommercial[]>();
  // * validations
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors: vError },
    reset,
  } = useForm({
    resolver: yupResolver(customerValidationSchema),
  });
  // * reset fields validation after changing state
  useEffect(() => {
    reset(customerState);
  }, [customerState]);

  // APOLLO MUTATION
  const [updateCustomer, { data: updatingData, loading: updatingLoading, error: updatingError }] = useMutation(UPDATE_CUSTOMER);
  const [getCustomer, { data: customerData, loading: customerLoading, error: customerError }] = useLazyQuery(GET_CUSTOMER);

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
          }
        }}) => {
        // the set data to state 
        if (data) {
          setCustomerState(data);
          setCommercialState(data.Commercials)
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
  }, [query.id_societe])
  

  // *** BIND "CUSTOMER" INPUT VALUES
  const setInputValue = (e: React.ChangeEvent<any>) => {
    setCustomerState(customerState => ({...customerState,
      [e.target.id]: e.target.value
    }));
    console.log("customerState", customerState);
  }
  // *** BIND "COMMERCIAL" INPUT VALUES
  const setCommercialInputValue = (e: React.ChangeEvent<any>, index: number) => {
    const { id: targetId, value: targetVal } = e.target;
    // ? UPDATE TARGET COMMERCIAL RECORD
    const targetCommercial = {
      ...customerState.Commercials[index],
      ...{[targetId]: targetVal},
    }
    // console.log("targetCommercial", targetCommercial);
    let newCommercials: any = [];
    // newCommercials[index] = targetCommercial
    newCommercials = customerState.Commercials.map((existingCommercial, idx) => (
      (idx == index) ? targetCommercial : existingCommercial
    ));
    // console.log("newCommercials merge", newCommercials);
    setCommercialState(newCommercials)
    setCustomerState((customerState) => ({
      ...customerState,
      Commercials: [...newCommercials]
    }));
    // console.log("newCommercials final", newCommercials)
    console.log("customerState", customerState)
  }
  const removeCommercial = (e: React.ChangeEvent<any>, recordId: number) => {
    let newCommercials: any = [];
    newCommercials = customerState.Commercials.filter((item) => recordId != item.id_commercial);
    console.log("newCommercials", newCommercials);
    setCustomerState((customerState) => ({
      ...customerState,
      Commercials: [...newCommercials]
    }));
  }
  const addNewCommercial = () => {
    let newCommercial: TCommercial = {
      ...initialCommercialState,
      ...{ id_commercial: uuidv4() },
      ...{ _id_societe: customerState.id_societe as any }};
    setCustomerState((customerState) => ({
      ...customerState,
      Commercials: [
        ...customerState.Commercials,
        ...[newCommercial]
      ],
    }));
  }

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
      hrefLink: '/customers/customer-list',
      btnVariant: EButtonVariant.dangerOutline,
      btnSize: EButtonSize.normal,
    },
  ]);

  // *** SUBMIT FORM HANDLER
  const submitEvent = async () => {
    console.log("submit:", customerState);
    await updateCustomer({
      variables: {
        id_societe: customerState.id_societe,
        input: customerState
      },
    })
     // *** ___ success
    .then(({
      data: {
        updateCustomer: {
          statusCode,
          title,
          message,
        },
      }
    }) => {
      dispatch(createAlert({
        isShown: true,
        title: title,
        message: message,
        variant: defineAlertyTheme(statusCode),
        delay: 5000
      }));
      router.push('/customers/customer-list')
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
    return false;
  };
  
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(updatingLoading || customerLoading)
  }, [updatingLoading, customerLoading])

  useEffect(() => {
    console.log("vError", vError);
  }, [vError])
  
  

  // JSX
  return (
    <CrudLayout headingText="Modifier Client" subHeadingText={`Modifer Client ${customerState.raison_social}`} actionList={actionList}>
      <form
        id="addCustomerForm"
        name="add-customerState-form"
        onSubmit={handleSubmit(submitEvent)}
      >
        <div className="relative / w-full / grid sm:grid-cols-2 lg:grid-cols-12 gap-x-2 gap-y-3 xl:gap-x-6 xl:gap-y-5 pt-2 pb-6">
          <Loading1 isLoading={isLoading} />
          <ErrorIndicator hasError={customerError} />
          <TextBox
            label="Code Société"
            type={"text"}
            id="id_societe"
            name="data[client][id_societe]"
            placeholder=""
            customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
            changeEvent={setInputValue}
            register={register}
            errors={vError.id_societe}
            value={formatValue(customerState.id_societe)}
            readonly={true}
          />
          <TextBox
            label="Raison Social"
            type={"text"}
            id="raison_social"
            name="data[client][raison_social]"
            placeholder=""
            customclass={"col-span-12 sm:col-span-2 lg:col-span-8 xl:col-span-9"}
            changeEvent={setInputValue}
            register={register}
            errors={vError.raison_social}
            value={formatValue(customerState.raison_social)}
          />
          <TextBox
            label="Form Juridique"
            type={"text"}
            id="form_jury"
            name="data[client][form_jury]"
            placeholder=""
            customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
            changeEvent={setInputValue}
            register={register}
            errors={vError.form_jury}
            value={formatValue(customerState.form_jury)}
          />
          <TextBox
            label="ICE"
            type={"text"}
            id="ice"
            name="data[client][ice]"
            placeholder=""
            customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
            changeEvent={setInputValue}
            register={register}
            errors={vError.ice}
            value={formatValue(customerState.ice)}
          />
          <TextBox
            label="Région"
            type={"text"}
            id="region"
            name="data[client][region]"
            placeholder=""
            customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
            changeEvent={setInputValue}
            register={register}
            errors={vError.region}
            value={formatValue(customerState.region)}
          />
          <TextBox
            label="Ville"
            type={"text"}
            id="ville"
            name="data[client][ville]"
            placeholder=""
            customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
            changeEvent={setInputValue}
            register={register}
            errors={vError.ville}
            value={formatValue(customerState.ville)}
          />
          <TextBox
            label="Chef Chantier"
            type={"text"}
            id="chef_chantier"
            name="data[client][chef_chantier]"
            placeholder=""
            customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
            changeEvent={setInputValue}
            register={register}
            errors={vError.chef_chantier}
            value={formatValue(customerState.chef_chantier)}
          />
          <TextBox
            label="Tél. Chef Chantier"
            type={"text"}
            id="tel_chef_chantier"
            name="data[client][tel_chef_chantier]"
            placeholder=""
            customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
            changeEvent={setInputValue}
            register={register}
            errors={vError.tel_chef_chantier}
            value={formatValue(customerState.tel_chef_chantier)}
          />
          <TextBox
            label="Gérant"
            type={"text"}
            id="gerant"
            name="data[client][gerant]"
            placeholder=""
            customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
            changeEvent={setInputValue}
            register={register}
            errors={vError.gerant}
            value={formatValue(customerState.gerant)}
          />
          <TextBox
            label="Tél. Gerant"
            type={"text"}
            id="tel_gerant"
            name="data[client][tel_gerant]"
            placeholder=""
            customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
            changeEvent={setInputValue}
            register={register}
            errors={vError.tel_gerant}
            value={formatValue(customerState.tel_gerant)}
          />
          <TextBox
            label="N° Compte"
            type={"text"}
            id="n_compte"
            name="data[client][n_compte]"
            placeholder=""
            customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
            changeEvent={setInputValue}
            register={register}
            errors={vError.n_compte}
            value={formatValue(customerState.n_compte)}
          />
          <TextBox
            label="Tél. Société"
            type={"text"}
            id="tel_societe"
            name="data[client][tel_societe]"
            placeholder=""
            customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
            changeEvent={setInputValue}
            register={register}
            errors={vError.tel_societe}
            value={formatValue(customerState.tel_societe)}
          />
          <TextBox
            label="Fax"
            type={"text"}
            id="fax"
            name="data[client][fax]"
            placeholder=""
            customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
            changeEvent={setInputValue}
            register={register}
            errors={vError.fax}
            value={formatValue(customerState.fax)}
          />
          <TextBox
            label="Courriel"
            type={"text"}
            id="courriel"
            name="data[client][courriel]"
            placeholder=""
            customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
            changeEvent={setInputValue}
            register={register}
            errors={vError.courriel}
            value={formatValue(customerState.courriel)}
          />
          <TextArea
            label="Adresse Facture"
            type={"text"}
            id="adresse_facture"
            name="data[client][adresse_facture]"
            placeholder=""
            customclass={"col-span-12 sm:col-span-2 lg:col-span-8 xl:col-span-9"}
            changeEvent={setInputValue}
            register={register}
            rows={2}
            errors={vError.adresse_facture}
            value={formatValue(customerState.adresse_facture)}
          />
          <TextBox
            label="Code Postal"
            type={"text"}
            id="zipcode"
            name="data[client][zipcode]"
            placeholder=""
            customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
            changeEvent={setInputValue}
            register={register}
            errors={vError.zipcode}
            value={formatValue(customerState.zipcode)}
          />
          <TextBox
            label="Ville"
            type={"text"}
            id="ville_livraison"
            name="data[client][ville_livraison]"
            placeholder=""
            customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
            changeEvent={setInputValue}
            register={register}
            errors={vError.ville_livraison}
            value={formatValue(customerState.ville_livraison)}
          />
          <SelectBox
            label="Pays"
            type={"text"}
            id="pays"
            name="data[client][pays]"
            customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
            changeEvent={setInputValue}
            register={register}
            errors={vError.pays}
            value={formatValue(customerState.pays)}
            optionList={countryList}
          />
          <TextArea
            label="Adresse livraison"
            type={"text"}
            id="adresse_livraison"
            name="data[client][adresse_livraison]"
            placeholder=""
            customclass={"col-span-12 sm:col-span-2 lg:col-span-8 xl:col-span-9"}
            changeEvent={setInputValue}
            register={register}
            errors={vError.adresse_livraison}
            value={formatValue(customerState.adresse_livraison)}
            rows={1}
          />
          <TextBox
            label="Code postal livraison"
            type={"text"}
            id="zipcode_livraison"
            name="data[client][zipcode_livraison]"
            placeholder=""
            customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
            changeEvent={setInputValue}
            register={register}
            errors={vError.zipcode_livraison}
            value={formatValue(customerState.zipcode_livraison)}
          />
          <TextBox
            label="Ville Livraison"
            type={"text"}
            id="ville_livraison"
            name="data[client][ville_livraison]"
            placeholder=""
            customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
            changeEvent={setInputValue}
            register={register}
            errors={vError.ville_livraison}
            value={formatValue(customerState.ville_livraison)}
          />
          <SelectBox
            label="Pays Livraison"
            type={"text"}
            id="pays_livraison"
            name="data[client][pays_livraison]"
            customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
            changeEvent={setInputValue}
            register={register}
            errors={vError.pays_livraison}
            value={formatValue(customerState.pays_livraison)}
            optionList={countryList}
          />
        </div>

        {/* COMMERCIALS */}
        {/* <div className="w-full mb-4">
          <HeadingTitle textSize={6} customclass="font-bold text-dark dark:text-white">
            Commercials
          </HeadingTitle>
        </div> */}
        {customerState.Commercials.map((item, index) => (
          <div className="commercial-crud" key={index}>
            {/* TITLE & "COMMERCIAL" ACTION */}
            <div className="w-full flex items-center mb-3">
              <HeadingTitle textSize={6} customclass="font-bold text-theme mb-3 w-70 mb-0">
                • Commercial {(index+1)}
              </HeadingTitle>
              <div className="d-block ml-auto">
                <Button
                  type={"button"}
                  variant={EButtonVariant.primaryOutline}
                  size={EButtonSize.normal}
                  clickEvent={(e: any) => removeCommercial(e, item.id_commercial as any)}>
                  <FiTrash />
                </Button>
              </div>
            </div>
            {/*** INPUTS ***/}
            <div className="commercial-fields / col-span-12 grid sm:grid-cols-2 lg:grid-cols-12 gap-x-2 gap-y-3 xl:gap-x-6 xl:gap-y-5 mb-6" key={index}>
              <TextBox
                label="Code Commercial"
                type={"text"}
                id="id_commercial"
                name={`data[client][commercial][${index}][id_commercial]`}
                placeholder=""
                customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
                changeEvent={(e: any) => setCommercialInputValue(e, index)}
                register={register}
                errors={vError?.Commercials?.length && vError.Commercials[index]?.id_commercial}
                value={formatValue(customerState.Commercials[index].id_commercial)}
                readonly={true}
              />
              <TextBox
                label="Nom"
                type={"text"}
                id="nom"
                name={`data[client][commercial][${index}][nom]`}
                placeholder=""
                customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
                changeEvent={(e: any) => setCommercialInputValue(e, index)}
                register={register}
                errors={vError?.Commercials?.length && vError.Commercials[index]?.nom}
                value={formatValue(customerState.Commercials[index].nom)}
              />
              <TextBox
                label="Prénom"
                type={"text"}
                id="prenom"
                name={`data[client][commercial][${index}][prenom]`}
                placeholder=""
                customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
                changeEvent={(e: any) => setCommercialInputValue(e, index)}
                register={register}
                errors={vError?.Commercials?.length && vError.Commercials[index]?.prenom}
                value={formatValue(customerState.Commercials[index].prenom)}
              />
              <TextBox
                label="Tél. Portable"
                type={"text"}
                id="tel_portable"
                name={`data[client][commercial][${index}][tel_portable]`}
                placeholder=""
                customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
                changeEvent={(e: any) => setCommercialInputValue(e, index)}
                register={register}
                errors={vError?.Commercials?.length && vError.Commercials[index]?.tel_portable}
                value={formatValue(customerState.Commercials[index].tel_portable)}
              />
              <TextBox
                label="Tél. Domicile"
                type={"text"}
                id="tel_domicile"
                name={`data[client][commercial][${index}][tel_domicile]`}
                placeholder=""
                customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
                changeEvent={(e: any) => setCommercialInputValue(e, index)}
                register={register}
                errors={vError?.Commercials?.length && vError.Commercials[index]?.tel_domicile}
                value={formatValue(customerState.Commercials[index].tel_domicile)}
              />
            </div>
          </div>
        ))}
        
        {/* ADD NEW */}
        {
          (customerState?.Commercials.length < 6) && (
            <div className="w-full flex items-center mb-6">
              <div className="d-block ml-auto">
                <Button type={"button"} variant={EButtonVariant.primaryOutline} size={EButtonSize.small} clickEvent={addNewCommercial}>
                  <FiPlus />
                  Nouveau commercial
                </Button>
              </div>
            </div>
          )
        }
        
        {/* FORM ACTION BUTTONS */}
        {/* <CrudActionForm {...crudActionList} /> */}

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

export default CustomerEdit;

const actionList: ICrudAction[] = [
  {
    actionType: ECrudActionType.link,
    title: 'Liste',
    icon: FaListAlt,
    customclass: 'py-2 px-2.5 ml-1 lg:ml-1.5',
    hrefLink: '/customers/customer-list',
  }
];