import {createSlice} from "@reduxjs/toolkit";
import {AdminState} from "./types";
import {asyncUpFetch} from "@/api/admin-api";


export const initialState: AdminState = {
    testValue: 0,
    testLoading: true,
    testAsyncValue: 0
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        up: (state, action) => {
            state.testValue = state.testValue + action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(asyncUpFetch.pending, (state) => {
            state.testLoading = true;
        });
        builder.addCase(asyncUpFetch.fulfilled, (state, action) => {
            state.testLoading = false;
            state.testAsyncValue += action.payload;
        });
        builder.addCase(asyncUpFetch.rejected, (state) => {
            state.testLoading = false;
        });
    }
});



export const { up } = adminSlice.actions