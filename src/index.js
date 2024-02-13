import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'

import productsReducer, { productsFetch } from './slices/ProductSlice'
import { productsApi } from './slices/productsApi';
import cartReducer, { getTotals } from './slices/cartSlice';
import authReducer, { loadUser } from './slices/authSlice';
import ordersSlice from './slices/ordersSlice';
import usersSlice from './slices/usersSlice';

// Add the service to store
const store = configureStore({
  reducer:{
    products: productsReducer,
    orders: ordersSlice,
    users: usersSlice,
    cart: cartReducer,
    auth: authReducer,
   [productsApi.reducerPath] : productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
})

store.dispatch(productsFetch());
store.dispatch(getTotals());
store.dispatch(loadUser(null)) // avoid the refresh, stay login after refresh.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
  
);