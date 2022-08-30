import { combineReducers } from 'redux';
import { configureStore, createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import { persistReducer , createMigrate,} from 'redux-persist';
// localstorage에 저장
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import getEmailReducer  from './getEmail.js';
import getMemberStoreReducer from './getStore.js'
import getEmojiReducer  from './getEmoji.js';


const persistConfig = {
    version: 1,
    key: 'root',
    storage: storage,
    // whitelist: ["email"],
};


const rootReducer = combineReducers({
  email : getEmailReducer.reducer,
  store : getMemberStoreReducer.reducer,
  emoji : getEmojiReducer.reducer
})

export default persistReducer(persistConfig, rootReducer)