
import { gql } from '@apollo/client';

// CUSTOMER LIST
export const READ_CUSTOMERS = gql`
  query GetAllCustomers {
    getAllCustomers {
      code_societe
      raison_social
      form_jury
      ville
      pays
    }
  }
`;

export const GET_CUSTOMER = gql`
  query GetCustomer($code_societe: String!) {
    getCustomer(code_societe: $code_societe) {
      code_societe
      form_jury
      raison_social
      ice
      region
      chef_chantier
      tel_chef_chantier
      tel_gerant
      gerant
      tel_societe
      n_compte
      fax
      courriel
      adresse_facture
      tel_commercial
      pays_livraison
      commercial
      ville_livraison
      zipcode_livraison
      ville
      zipcode
      pays
      adresse_livraison
    }
  }
`;
