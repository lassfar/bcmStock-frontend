import { RootState } from "@/app/store/redux/store";
import { createSelector } from "@reduxjs/toolkit";
import { IAlert } from '@/components/types/widgets/interfaces';

export const selectAlerts = (state: RootState) => state.alerts;
export const selectAlertId = (state: RootState, id: string) => id;
export const selectAlertById = createSelector(
  [
    selectAlerts, selectAlertId
  ],
  (alerts: IAlert[], id: string) => alerts?.find((item: IAlert) => item.id == id),
)