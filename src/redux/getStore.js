import { createSlice } from "@reduxjs/toolkit";



const getMemberStoreReducer = createSlice({
  name: "getStore",
  initialState: {store: ''},
  reducers: {
    getStore: (state, action) => {
      { state.store = action.payload };
    }
  }
});


export const { getStore } = getMemberStoreReducer.actions;

export default getMemberStoreReducer;
