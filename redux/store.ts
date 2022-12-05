import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { cartReducer } from './cart.slice';

const reducer = combineReducers({
  cart: cartReducer,
});

const store = configureStore({
  reducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
