import { createSlice } from "@reduxjs/toolkit";

const getEmojiReducer = createSlice({
  name: "getEmoji",
  initialState: [],
  reducers: {
    getEmoji: (state, action) => {
      return (state = action.payload );
    },
    default: (state, action) => {return {...state}}
  }
});


export const { getEmoji } = getEmojiReducer.actions;

export default getEmojiReducer;