// import { Provider, useSelector, useDispatch } from 'react-redux'; 
import { configureStore } from "@reduxjs/toolkit";
//persist
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer.js';

import logger from 'redux-logger'

// import { data } from 'jquery';


export const store = configureStore({ reducer: rootReducer, middleware: [logger]
});    
export const persistor = persistStore(store);

export default { store, persistor };