type TCustomer = {
  code_societe: number | string,
  raison_social: string,
  form_jury: string,
  ice: number | string,
  region: string,
  chef_chantier: string,
  tel_chef_chantier: number | string,
  gerant: string,
  tel_gerant: number | string,
  n_compte: number | string,
  tel_societe: number | string,
  fax: number | string,
  courriel: number | string,
  adresse_facture: string,
  zipcode: number | string,
  ville: number | string,
  pays: number | string,
  adresse_livraison:  string,
  zipcode_livraison: number | string,
  ville_livraison: number | string,
  pays_livraison: number | string,
  commercial: number | string,
  tel_commercial: number | string,
}

export default TCustomer