import * as Yup from 'yup';


const customerValidationSchema = Yup.object().shape({
  id_societe:
    Yup.string().required().min(1).max(50),
  raison_social:
    Yup.string().required().min(5).max(50),
  form_jury:
    Yup.string().required().min(2).max(50),
  ice:
    Yup.string().nullable().notRequired().when('ice', { is: (value: any) => value, then: (rule: any) => rule.min(2) }),
  region:
    Yup.string().nullable().notRequired().when('region', { is: (value: any) => value, then: (rule: any) => rule.min(2) }),
  chef_chantier:
    Yup.string().nullable().notRequired().when('chef_chantier', { is: (value: any) => value, then: (rule: any) => rule.min(2) }),
  tel_chef_chantier:
    Yup.string().nullable().notRequired().when('tel_chef_chantier', { is: (value: any) => value, then: (rule: any) => rule.min(2) }),
  gerant:
    Yup.string().nullable().notRequired().when('gerant', { is: (value: any) => value, then: (rule: any) => rule.min(2) }),
  tel_gerant:
    Yup.string().nullable().notRequired().when('tel_gerant', { is: (value: any) => value, then: (rule: any) => rule.min(2) }),
  n_compte:
    Yup.string().nullable().notRequired().when('n_compte', { is: (value: any) => value, then: (rule: any) => rule.min(2) }),
  tel_societe:
    Yup.string().nullable().notRequired().when('tel_societe', { is: (value: any) => value, then: (rule: any) => rule.min(2) }),
  fax:
    Yup.string().nullable().notRequired().when('fax', { is: (value: any) => value, then: (rule: any) => rule.min(2) }),
  courriel:
    Yup.string().nullable().notRequired().when('courriel', { is: (value: any) => value, then: (rule: any) => rule.min(2) }),
  adresse_facture:
    Yup.string().nullable().notRequired().when('adresse_facture', { is: (value: any) => value, then: (rule: any) => rule.min(2) }),
  zipcode:
    Yup.string().nullable().notRequired().when('zipcode', { is: (value: any) => value, then: (rule: any) => rule.min(2) }),
  ville:
    Yup.string().nullable().notRequired().when('ville', { is: (value: any) => value, then: (rule: any) => rule.min(2) }),
  pays:
    Yup.string().nullable().notRequired().when('pays', { is: (value: any) => value, then: (rule: any) => rule.min(2) }),
  adresse_livraison:
    Yup.string().nullable().notRequired().when('adresse_livraison', { is: (value: any) => value, then: (rule: any) => rule.min(2) }),
  zipcode_livraison:
    Yup.string().nullable().notRequired().when('zipcode_livraison', { is: (value: any) => value, then: (rule: any) => rule.min(2) }),
  ville_livraison:
    Yup.string().nullable().notRequired().when('ville_livraison', { is: (value: any) => value, then: (rule: any) => rule.min(2) }),
  pays_livraison:
    Yup.string().nullable().notRequired().when('pays_livraison', { is: (value: any) => value, then: (rule: any) => rule.min(2) }),
  client_status:
    Yup.string().nullable().notRequired().when('client_status', { is: (value: any) => value, then: (rule: any) => rule.min(2) }),
  raison_blocage:
    Yup.string().nullable().notRequired().when('raison_blocage', { is: (value: any) => value, then: (rule: any) => rule.min(2) }),
  notes:
    Yup.string().nullable().notRequired().when('notes', { is: (value: any) => value, then: (rule: any) => rule.min(20) }),
  solubilite:
    Yup.string().nullable().notRequired().when('solubilite', { is: (value: any) => value, then: (rule: any) => rule.min(3) }),
  plafond_accorde:
    Yup.string().nullable().notRequired().when('plafond_accorde', { is: (value: any) => value, then: (rule: any) => rule.min(3) }),
  Commercials: Yup.array().of(
    Yup.object().shape({
      id_commercial: Yup.string().required().min(2).max(100),
      nom: Yup.string().required().min(2).max(100),
      prenom: Yup.string().required().min(2).max(100),
      tel_domicile: Yup.string().nullable().min(2).max(50),
      tel_portable: Yup.string().nullable().min(2).max(50),
      _id_societe: Yup.string().required().min(1).max(50),
    }),
  )
}, [
  ['form_jury', 'form_jury'],
  ['raison_social', 'raison_social'],
  ['id_societe', 'id_societe'],
  ['ice', 'ice'],
  ['region', 'region'],
  ['chef_chantier', 'chef_chantier'],
  ['tel_chef_chantier', 'tel_chef_chantier'],
  ['gerant', 'gerant'],
  ['tel_gerant', 'tel_gerant'],
  ['n_compte', 'n_compte'],
  ['tel_societe', 'tel_societe'],
  ['fax', 'fax'],
  ['courriel', 'courriel'],
  ['adresse_facture', 'adresse_facture'],
  ['zipcode', 'zipcode'],
  ['ville', 'ville'],
  ['pays', 'pays'],
  ['adresse_livraison', 'adresse_livraison'],
  ['zipcode_livraison', 'zipcode_livraison'],
  ['ville_livraison', 'ville_livraison'],
  ['pays_livraison', 'pays_livraison'],
  ['client_status', 'client_status'],
  ['raison_blocage', 'raison_blocage'],
  ['notes', 'notes'],
  ['solubilite', 'solubilite'],
  ['plafond_accorde', 'plafond_accorde'],
  ['Commercials', 'Commercials'],
]);

Yup.reach(customerValidationSchema, 'Commercials[].id_commercial')
Yup.reach(customerValidationSchema, 'Commercials[].nom')
Yup.reach(customerValidationSchema, 'Commercials[].prenom')
Yup.reach(customerValidationSchema, 'Commercials[].tel_portable')
Yup.reach(customerValidationSchema, 'Commercials[].tel_domicile')

export default customerValidationSchema