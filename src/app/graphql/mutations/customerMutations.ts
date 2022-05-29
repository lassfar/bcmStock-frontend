import { gql } from "@apollo/client";

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($input: CustomerAddInput) {
    createCustomer(input: $input) {
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

// UPDATE CUSTOMER MUTATION
export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($id_societe: String!, $input: CustomerAddInput) {
    updateCustomer(id_societe: $id_societe, input: $input) {
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

// DELETE CUSTOMER MUTATION
export const DELETE_CUSTOMER = gql`
  mutation DeleteCustomer($id_societe: String!) {
    deleteCustomer(id_societe: $id_societe) {
      statusCode
      title
      message
      data {
        id_societe
        raison_social
        Commercials {
          id_commercial
          nom
          prenom
          _id_societe
        }
      }
    }
  }
`;