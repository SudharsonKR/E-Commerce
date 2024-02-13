import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { setHeaders, url } from "./api";

const initialState={
    list:[],
    status: null,
}

export const ordersFetch = createAsyncThunk(
    "orders/ordersFetch",
    async()=>{
        try{
        const response = await axios.get(`${url}/orders`, setHeaders())
        
        return response.data
        } catch (error){
            console.log(error)
        }
    }
);

export const ordersEdit = createAsyncThunk(
    "orders/ordersEdit",
    async (values, {getState}) => {
        const state = getState();

        let currentOrder = state.orders.list.filter((order)=>order._id === values.id);

        const newOrder = {
            ...currentOrder[0],
            delivery_status: values.delivery_status,
        };
      try {
        const response = await axios.put(`${url}/orders/${newOrder._id}`, newOrder, setHeaders());
  
        return response.data;
      } catch (error) {
        console.log(error);
        
      }
    }
  );

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(ordersFetch.pending, (state, action) => {
          state.status = "pending";
        })
        .addCase(ordersFetch.fulfilled, (state, action) => {
            state.list = action.payload;
            state.status = "success";
                             
        })
        .addCase(ordersFetch.rejected, (state, action) => {
            state.status = "rejected";  
        })
        .addCase(ordersEdit.pending, (state, action) => {
          state.status = "pending";
        })
        .addCase(ordersEdit.fulfilled, (state, action) => {
          const updatedOrders = state.list.map((order)=>order._id === action.payload._id ? action.payload : order);
          state.list = updatedOrders
          state.status = "success";
          
        })
        .addCase(ordersEdit.rejected, (state, action) => {
          state.status = "rejected";
        })
        .addDefaultCase((state, action) => {})
      },
})

export default ordersSlice.reducer;