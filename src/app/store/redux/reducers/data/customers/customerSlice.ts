import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store/redux/store';
import TCustomer from '@/app/ts/types/Customer';

// const customer: TCustomer = {
// }
export const initialState: TCustomer = {
  id_societe: '',
  raison_social: '',
  form_jury: '',
  ice: '',
  region: '',
  chef_chantier: '',
  tel_chef_chantier: '',
  gerant: '',
  tel_gerant: '',
  n_compte: '',
  tel_societe: '',
  fax: '',
  courriel: '',
  adresse_facture: '',
  zipcode: '',
  ville: '',
  pays: '',
  adresse_livraison:  '',
  zipcode_livraison: '',
  ville_livraison: '',
  pays_livraison: '',
  client_status: '',
  raison_blocage: '',
  notes: '',
  solubilite: '',
  plafond_accorde: '',
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
// The `reducers` field lets us define reducers and generate associated actions. 
// In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app. 
// So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
  reducers: {
    createCustomer: (state, action: PayloadAction<TCustomer>) => {
      state = action.payload;
      return state
    },
    setCustomerFields: (state, action: PayloadAction<TCustomer>) => {
      state = action.payload;
      return {
        ...state,
        customer: state
      }
    }
  },
});

export const {
  createCustomer,
  setCustomerFields,
} = customerSlice.actions

export const selectCustomer = (state: RootState) => state.customer;

export default customerSlice.reducer
