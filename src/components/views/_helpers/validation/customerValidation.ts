import * as Yup from 'yup';


const customerValidationSchema = Yup.object().shape({
  code_societe:
    Yup.string().required().min(5).max(50),
  raison_social:
    Yup.string().required().min(5).max(50),
  form_jury:
    Yup.string().required().min(5).max(50),
  ice:
    Yup.string().notRequired().when('ice', { is: (value: any) => value, then: (rule: any) => rule.min(5) }),
  region:
    Yup.string().notRequired().when('region', { is: (value: any) => value, then: (rule: any) => rule.min(5) }),
  chef_chantier:
    Yup.string().notRequired().when('chef_chantier', { is: (value: any) => value, then: (rule: any) => rule.min(5) }),
  tel_chef_chantier:
    Yup.string().notRequired().when('tel_chef_chantier', { is: (value: any) => value, then: (rule: any) => rule.min(5) }),
  gerant:
    Yup.string().notRequired().when('gerant', { is: (value: any) => value, then: (rule: any) => rule.min(5) }),
  tel_gerant:
    Yup.string().notRequired().when('tel_gerant', { is: (value: any) => value, then: (rule: any) => rule.min(5) }),
  n_compte:
    Yup.string().notRequired().when('n_compte', { is: (value: any) => value, then: (rule: any) => rule.min(5) }),
  tel_societe:
    Yup.string().notRequired().when('tel_societe', { is: (value: any) => value, then: (rule: any) => rule.min(5) }),
  fax:
    Yup.string().notRequired().when('fax', { is: (value: any) => value, then: (rule: any) => rule.min(5) }),
  courriel:
    Yup.string().notRequired().when('courriel', { is: (value: any) => value, then: (rule: any) => rule.min(5) }),
  adresse_facture:
    Yup.string().notRequired().when('adresse_facture', { is: (value: any) => value, then: (rule: any) => rule.min(5) }),
  zipcode:
    Yup.string().notRequired().when('zipcode', { is: (value: any) => value, then: (rule: any) => rule.min(5) }),
  ville:
    Yup.string().notRequired().when('ville', { is: (value: any) => value, then: (rule: any) => rule.min(5) }),
  pays:
    Yup.string().notRequired().when('pays', { is: (value: any) => value, then: (rule: any) => rule.min(5) }),
  adresse_livraison:
    Yup.string().notRequired().when('adresse_livraison', { is: (value: any) => value, then: (rule: any) => rule.min(5) }),
  zipcode_livraison:
    Yup.string().notRequired().when('zipcode_livraison', { is: (value: any) => value, then: (rule: any) => rule.min(5) }),
  ville_livraison:
    Yup.string().notRequired().when('ville_livraison', { is: (value: any) => value, then: (rule: any) => rule.min(5) }),
  pays_livraison:
    Yup.string().notRequired().when('pays_livraison', { is: (value: any) => value, then: (rule: any) => rule.min(5) }),
  commercial:
    Yup.string().notRequired().when('commercial', { is: (value: any) => value, then: (rule: any) => rule.min(5) }),
  tel_commercial:
    Yup.string().notRequired().when('tel_commercial', { is: (value: any) => value, then: (rule: any) => rule.min(5) }),
  createdOn:
    Yup.date().default(function () {
    return new Date();
  }),
}, [
  ['form_jury', 'form_jury'],
  ['raison_social', 'raison_social'],
  ['code_societe', 'code_societe'],
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
  ['commercial', 'commercial'],
  ['tel_commercial', 'tel_commercial'],
]);

export default customerValidationSchema