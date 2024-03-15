import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { adminSlice } from "./admin/slice";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import {notificationSlice} from '@/store/notification/slice';
import {memberSlice} from "@/store/member/slice";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const logger = createLogger()

const reducers = combineReducers({
    member: memberSlice.reducer,
    admin: adminSlice.reducer,
    notification: notificationSlice.reducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['member', 'admin']
}

const persistedReducer = persistReducer(persistConfig, reducers)

// TODO 설정 값을통해 dev, local 로 설정값 나눠서 devtool 사용할것.
export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, logger],
})


