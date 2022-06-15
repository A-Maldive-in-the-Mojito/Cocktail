import { createSlice } from "@reduxjs/toolkit";

const getEmailReducer = createSlice({
  name: "getEmail",
  initialState: [],
  reducers: {
    getEmail: (state, action) => {
      return (state = action.payload );
    },
    removeEmail: (state, action) => {
      return (state = null)
    },
    default: (state, action) => {return {...state}}
  }
});


export const { getEmail, removeEmail } = getEmailReducer.actions;

export default getEmailReducer;