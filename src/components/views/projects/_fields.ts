import { EInputKind } from '@/components/types/props/enum';
import { ISelectBox, ITextBox, ICheckBox, ITextArea, IRadioButton } from '@/components/types/widgets/interfaces';

export const projects_fields: (ITextBox | ISelectBox | ICheckBox | IRadioButton | ITextArea)[] = [
  {
    type: EInputKind.text,
    id: 'code_projet',
    name: 'data[projet][code_projet]',
    label: 'Code Projet',
  },
  {
    type: EInputKind.text,
    id: 'designation',
    name: 'data[projet][designation]',
    label: 'Designation',
  },
  {
    type: 'selectbox',
    id: 'client_id',
    name: 'data[projet][designation]',
    label: 'Client',
    optionList: [
      {
        text: 'client 1',
        value: '1'
      },
      {
        text: 'client 2',
        value: '2'
      },
    ]
  },
];