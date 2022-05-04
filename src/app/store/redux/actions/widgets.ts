import { createAction } from "@reduxjs/toolkit"
import { IAlert } from '@/components/types/widgets/interfaces';

export const createAlert = createAction<IAlert>('alert/createAlert')
export const removeAlert = createAction<IAlert>('alert/removeAlert')
export const removeAsyncAlert = createAction<IAlert>('alert/removeAsyncAlert')
export const findAlert = createAction<IAlert>('alert/findAlert')