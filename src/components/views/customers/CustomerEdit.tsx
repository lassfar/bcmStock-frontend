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
import { UPDATE_CUSTOMER } from "@/app/graphql/mutations/customerMutations";
import { ICrudAction, IAlert } from '@/components/types/widgets/interfaces';
import { ECrudActionType, EAlertTheme } from '@/components/types/props/enum';
import Loading1 from "@/components/widgets/global/indicators/Loading1";
import { GET_CUSTOMER } from "@/app/graphql/queries/customerQueries";
import { useRouter } from 'next/router';
import Alert from "@/components/widgets/global/Alert";
import { formatValue } from "@/components/views/_helpers/global/functions";
import { createAlert } from '@/app/store/redux/actions/widgets';
import { useAppDispatch } from '@/app/store/redux/hooks';
import { v4 as uuidv4 } from "uuid";
import { initialCustomer } from './_data/initialState';
import DangerIndicator from "@/components/widgets/global/indicators/DangerIndicator";

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
  // * customer state
  const [customerState, setCustomerState] = useState<TCustomer>({...initialCustomer, ...{ code_societe: uuidv4() }});
  // * validations
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
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
    if (query.code_societe) {
      getCustomer({
        variables: {
          code_societe: query.code_societe,
        },
      })
      // *** success
      .then(() => {
        console.log("then get customer")
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
  }, [query.code_societe])
  
  useEffect(() => {
    if (customerData) {
      setCustomerState(customerData.getCustomer);
      // console.log("getCustomer", updatingData.getCustomer);
    }
  }, [customerData])
  

  const setInputValue = (e: React.ChangeEvent<any>) => {
    setCustomerState(customerState => ({...customerState,
      [e.target.id]: e.target.value
    }));

    console.log("customerState", customerState);
  }

  const submitEvent = async () => {
    await updateCustomer({
      variables: customerState
    })
     // *** ___ success
    .then(({
      data: {
        updateCustomer: { raison_social }
      }
    }) => {
      const alertId = uuidv4();
      dispatch(createAlert({
        id: alertId,
        isShown: true,
        title: "Succès!",
        message: `Client "${(raison_social?.substring(0, 30))}" modifié avec succès!`,
        variant: EAlertTheme.info,
      }));
    })
     // !!! ____ error
    .catch((error) => {
      const alertId = uuidv4();
      dispatch(createAlert({
        id: alertId,
        isShown: true,
        title: "Erreur!",
        message: error.message || `Erreur de modification!`,
        variant: EAlertTheme.danger,
      }));      
    });
    return false;
  };
  
  const [isLoading, setLoading] = useState(updatingLoading && customerLoading)

  // JSX
  return (
    <CrudLayout headingText="Modifier Client" subHeadingText={`Modifer Client ${customerState.raison_social}`} actionList={actionList}>
      <form
        id="addCustomerForm"
        name="add-customerState-form"
        onSubmit={handleSubmit(submitEvent)}
      >
        <div className="relative / w-full / grid sm:grid-cols-2 lg:grid-cols-12 gap-x-3 gap-y-6 lg:gap-x-6 lg:gap-y-6 pt-2 pb-6">
          <Loading1 isLoading={isLoading} />
          <DangerIndicator isDanger={customerError} />
          <TextBox
            label="Code Société"
            type={"text"}
            id="code_societe"
            name="data[client][code_societe]"
            placeholder=""
            customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
            changeEvent={setInputValue}
            register={register}
            errors={errors.code_societe}
            value={formatValue(customerState.code_societe)}
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
            errors={errors.raison_social}
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
            errors={errors.form_jury}
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
            errors={errors.ice}
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
            errors={errors.region}
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
            errors={errors.ville}
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
            errors={errors.chef_chantier}
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
            errors={errors.tel_chef_chantier}
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
            errors={errors.gerant}
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
            errors={errors.tel_gerant}
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
            errors={errors.n_compte}
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
            errors={errors.tel_societe}
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
            errors={errors.fax}
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
            errors={errors.courriel}
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
            errors={errors.adresse_facture}
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
            errors={errors.zipcode}
            value={formatValue(customerState.zipcode)}
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
            errors={errors.ville}
            value={formatValue(customerState.ville)}
          />
          <SelectBox
            label="Pays"
            type={"text"}
            id="pays"
            name="data[client][pays]"
            customclass={"col-span-12 sm:col-span-1 lg:col-span-4 xl:col-span-3"}
            changeEvent={setInputValue}
            register={register}
            errors={errors.pays}
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
            errors={errors.adresse_livraison}
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
            errors={errors.zipcode_livraison}
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
            errors={errors.ville_livraison}
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
            errors={errors.pays_livraison}
            value={formatValue(customerState.pays_livraison)}
            optionList={countryList}
          />
          
        </div>
        
        {/* FORM ACTION BUTTONS */}
        <div className="form-action-group / w-full flex items-start justify-center gap-5 py-6">
          <button type={'submit'} className={'btn btn-primary'} disabled={formState.isSubmitting}>
            <FaPlusSquare />
            AJOUTER
          </button>
          <button type={'button'} className={'btn btn-danger'}>
            <FaTimesCircle />
            ANNULER
          </button>
        </div>
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
    customclass: 'mr-2',
    hrefLink: '/customers/customer-list',
  }
];