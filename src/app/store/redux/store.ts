import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import customerReducer from '@/app/store/redux/reducers/data/customers/customerSlice';
import alertReducer from '@/app/store/redux/reducers/widgets/alerty';

export const appStore = configureStore({
  reducer: {
    customer: customerReducer,
    alerts: alertReducer,
  },
});

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
