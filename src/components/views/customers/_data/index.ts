import { FaEye, FaPen } from "react-icons/fa";
import { ECrudActionType } from '@/components/types/props/enum';
import { ICrudListingTable } from '@/components/types/widgets/interfaces';

export const customerTableStructure: ICrudListingTable = {
  tableHeader: [
    {
      cellname: "Raison social",
      cellkey: "code_societe",
      minWidth: "120px",
      maxWidth: "120px",
    },
    {
      cellname: "Forme Juridique",
      cellkey: "form_jury",
      minWidth: "120px",
      maxWidth: "120px",
    },
    {
      cellname: "Ville",
      cellkey: "ville",
      minWidth: "120px",
      maxWidth: "120px",
    },
    {
      cellname: "Pays",
      cellkey: "pays",
      minWidth: "120px",
      maxWidth: "120px",
    },
    {
      cellname: "Actions",
      cellkey: "actions",
      minWidth: "150px",
      maxWidth: "150px",
    },
  ],
  tableActions: [
    {
      actionType: ECrudActionType.link,
      title: 'Afficher',
      icon: FaEye,
      hrefLink: '/customers/',
    },
    {
      actionType: ECrudActionType.link,
      title: 'Modifier',
      icon: FaPen,
      hrefLink: '/customers/customer-edit/',
    },
    {
      actionType: ECrudActionType.click,
      title: 'Modifier',
      icon: FaPen,
      clickEvent: () => true,
    },
  ]
};