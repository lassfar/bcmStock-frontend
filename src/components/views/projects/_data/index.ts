import { ICrudTableHeader } from "@/components/types/widgets/interfaces";

// *** TABLE HEADER
export const projectTableHeaderListing: ICrudTableHeader[] = [
  {
    cellkey: 'id_project',
    cellname: 'ID',
  },
  {
    cellkey: 'designation',
    cellname: 'designation',
  },
  {
    cellkey: 'client',
    cellname: 'Client',
  },
  {
    cellkey: 'actions',
    cellname: 'Actions',
    customclass: 'w-36',
  }
];

// *** TABLE HEADER
export const projectTableHeaderDetails: ICrudTableHeader[] = [
  {
    cellkey: 'id_project',
    cellname: 'ID',
  },
  {
    cellkey: 'designation',
    cellname: 'designation',
  },
  {
    cellkey: 'client',
    cellname: 'Client',
  },
  {
    cellkey: 'actions',
    cellname: 'Actions',
  }
];
