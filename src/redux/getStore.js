import { createSlice } from "@reduxjs/toolkit";



const getMemberStoreReducer = createSlice({
  name: "getStore",
  initialState: [],
  reducers: {
    getStore: (state, action) => {
      return (state = action.payload);
    },
    removeStore: (state, action) => {
      return (state = null);
    }
  }})
  


export const { getStore, removeStore} = getMemberStoreReducer.actions;

export default getMemberStoreReducer;