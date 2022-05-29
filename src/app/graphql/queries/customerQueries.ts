
import { gql } from '@apollo/client';

// CUSTOMER LIST
export const READ_CUSTOMERS = gql`
  query GetAllCustomers {
    getAllCustomers {
      statusCode
      title
      message
      data {
        id_societe
        raison_social
        form_jury
        ice
        ville
        pays
        Commercials {
          id_commercial
          nom
          prenom
        }
      }
    }
  }
`;

export const GET_CUSTOMER = gql`
  query GetCustomer($id_societe: String!) {
    getCustomer(id_societe: $id_societe) {
      statusCode
      title
      message
      data {
        id_societe
        raison_social
        form_jury
        ice
        region
        chef_chantier
        tel_chef_chantier
        gerant
        tel_gerant
        n_compte
        tel_societe
        fax
        courriel
        adresse_facture
        zipcode
        ville
        pays
        adresse_livraison
        zipcode_livraison
        ville_livraison
        pays_livraison
        client_status
        raison_blocage
        notes
        solubilite
        plafond_accorde
        Commercials {
          id_commercial
          nom
          prenom
          tel_domicile
          tel_portable
          _id_societe
        }
      }
    }
  }
`;
