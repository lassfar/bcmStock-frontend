import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { EAlertTheme } from '@/components/types/props/enum';
import { IAlert } from '@/components/types/widgets/interfaces';
import { createAlert, removeAlert } from '@/app/store/redux/actions/widgets';
import { v4 as uuidv4 } from "uuid";

export const initialState: IAlert[] = [
  {
    id: uuidv4(),
    isShown: false,
    title: "Succès!",
    message: "",
    variant: EAlertTheme.success,
  }
];

const alertReducer = createReducer(initialState, builder => {
  builder
    .addCase(createAlert, (state, action) => {
      state.push({
        ...action.payload,
        ...{id: uuidv4()}
      });
      return state;
    })
    .addCase(removeAlert, (state, action) => {
      const alertId = action.payload.id;
      const filteredState: IAlert[] = state.filter((alert: IAlert) => alert.id !== alertId);
      return filteredState;
    });
});

export default alertReducer