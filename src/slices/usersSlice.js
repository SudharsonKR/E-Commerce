import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { setHeaders, url } from "./api";
import { toast } from "react-toastify";

const initialState={
    userlist:[],
    status: null,
    deleteStatus: null,
};

export const usersFetch = createAsyncThunk(
    "users/usersFetch",
    async()=>{
        try{
        const response = await axios.get(`${url}/users`, setHeaders())
        
        return response.data
        } catch (error){
            console.log(error)
        }
    }
);

export const userDelete = createAsyncThunk(
    "users/userDelete",
    async (id) => {
      try {
        const response = await axios.delete(`${url}/users/${id}`, setHeaders());
  
        return response.data;
      } catch (error) {
        console.log(error.resoponse.data);
        toast.error(error.response?.data)
      }
    }
  );

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(usersFetch.pending, (state, action) => {
          state.status = "pending";
        })
        .addCase(usersFetch.fulfilled, (state, action) => {
            state.userlist = action.payload;
            state.status = "success";
                             
        })
        .addCase(usersFetch.rejected, (state, action) => {
            state.status = "rejected";  
        })
        .addCase(userDelete.pending, (state, action) => {
          state.deleteStatus = "pending";
        })
        .addCase(userDelete.fulfilled, (state, action) => {
          const newuserlist = state.userlist.filter((user)=> user._id !== action.payload._id);
          state.userlist = newuserlist;
          state.deleteStatus = "success";
          toast.error("User Deleted", {position: "bottom-left"})
          
        })
        .addCase(userDelete.rejected, (state, action) => {
          state.deleteStatus = "rejected";
        })
        .addDefaultCase((state, action) => {})
      },
})

export default usersSlice.reducer;