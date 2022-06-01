import { createSlice } from "@reduxjs/toolkit";

const getEmailReducer = createSlice({
  name: "getEmail",
  initialState: {email: ''},
  reducers: {
    getEmail: (state, action) => {
      { state.email = action.payload };
    },
    removeEmail: (state, action) => state= [],
    default: (state, action) => {return {...state}}
  }
});


export const { getEmail, removeEmail } = getEmailReducer.actions;

export default getEmailReducer;
