// import { createStore } from 'redux';
// import { createReducer, configureStore, createSlice , createAsyncThunk} from "@reduxjs/toolkit";
// import { Provider, useSelector, useDispatch } from 'react-redux'; 
// import axios from 'axios';
// import { data } from 'jquery';



// const URL = 'http://localhost:5000'


// // export const get_api = createAsyncThunk(
// //     "GET",
// //     async() => {
// //         const { data: { all_cocktails } } = await axios.get(`${URL}/cocktails`);
// //         const cocktails = JSON.parse(all_cocktails)
// //         console.log(cocktails)
// //         return cocktails;
// //     }
// // )

// const cocktail_api = createSlice({
//     name: "cocktailReducer",
//     initialState: [],
//     reducers: {
//         get(state, {payload}) {
//             state.push(payload)
//         }
//     }
    
// });

// // console.log(get_api)
// // 

// export const {get} = cocktail_api.actions;

// const store = configureStore({reducer: cocktail_api.reducer})
// // const store = configureStore({reducer})

// export default store;