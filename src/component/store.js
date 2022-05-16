import { createStore } from 'redux';
import { createReducer, configureStore, createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from 'react-redux'; 

// import { data } from 'jquery';


const ADD_ID = "ADD_ID"

const addID = id => {
    return {
        type: ADD_ID,
        id
    }
};

const reducer = (state = [], action) => {
    switch (action.type) {
        case ADD_ID:
            return [{ id: action.id}, ...state];
        default:
            return state;
    }
};    


const store = configureStore({reducer});

export const actionCreators = {
    addID
  };

export default store;