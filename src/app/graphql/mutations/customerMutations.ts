import { gql } from "@apollo/client";

export const CREATE_CUSTOMER = gql`
  mutation createCustomer(
    $code_societe: String!,
    $raison_social: String!,
    $form_jury: String!,
    $ice: String,
    $region: String,
    $chef_chantier: String,
    $tel_chef_chantier: String,
    $gerant: String,
    $tel_gerant: String,
    $n_compte: String,
    $tel_societe: String,
    $fax: String,
    $courriel: String,
    $adresse_facture: String,
    $zipcode: String,
    $ville: String,
    $pays: String,
    $adresse_livraison:  String,
    $zipcode_livraison: String,
    $ville_livraison: String,
    $pays_livraison: String,
    $commercial: String,
    $tel_commercial: String,
  ) {
    createCustomer(
      code_societe: $code_societe, 
      raison_social: $raison_social,
      form_jury: $form_jury,
      ice: $ice, 
      region: $region, 
      chef_chantier: $chef_chantier, 
      tel_chef_chantier: $tel_chef_chantier, 
      gerant: $gerant, 
      tel_gerant: $tel_gerant, 
      n_compte: $n_compte, 
      tel_societe: $tel_societe, 
      fax: $fax, 
      courriel: $courriel, 
      adresse_facture: $adresse_facture, 
      zipcode: $zipcode, 
      ville: $ville, 
      pays: $pays, 
      adresse_livraison: $adresse_livraison,  
      zipcode_livraison: $zipcode_livraison, 
      ville_livraison: $ville_livraison, 
      pays_livraison: $pays_livraison, 
      commercial: $commercial, 
      tel_commercial: $tel_commercial,
    ) {
      code_societe
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
      commercial
      tel_commercial
    }
}`;


export const UPDATE_CUSTOMER = gql`
  mutation updateCustomer(
    $code_societe: String!,
    $raison_social: String!,
    $form_jury: String!,
    $ice: String,
    $region: String,
    $chef_chantier: String,
    $tel_chef_chantier: String,
    $gerant: String,
    $tel_gerant: String,
    $n_compte: String,
    $tel_societe: String,
    $fax: String,
    $courriel: String,
    $adresse_facture: String,
    $zipcode: String,
    $ville: String,
    $pays: String,
    $adresse_livraison:  String,
    $zipcode_livraison: String,
    $ville_livraison: String,
    $pays_livraison: String,
    $commercial: String,
    $tel_commercial: String,
  ) {
  updateCustomer(
    code_societe: $code_societe, 
    raison_social: $raison_social,
    form_jury: $form_jury,
    ice: $ice, 
    region: $region, 
    chef_chantier: $chef_chantier, 
    tel_chef_chantier: $tel_chef_chantier, 
    gerant: $gerant, 
    tel_gerant: $tel_gerant, 
    n_compte: $n_compte, 
    tel_societe: $tel_societe, 
    fax: $fax, 
    courriel: $courriel, 
    adresse_facture: $adresse_facture, 
    zipcode: $zipcode, 
    ville: $ville, 
    pays: $pays, 
    adresse_livraison: $adresse_livraison,  
    zipcode_livraison: $zipcode_livraison, 
    ville_livraison: $ville_livraison, 
    pays_livraison: $pays_livraison, 
    commercial: $commercial, 
    tel_commercial: $tel_commercial,
  ) {
      code_societe
      raison_social
      ville
      pays
      form_jury
    }
  }
`;


// DELETE CUSTOMER MUTATION
export const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($code_societe: String!) {
    deleteCustomer(code_societe: $code_societe) {
      raison_social
    }
  }
`;