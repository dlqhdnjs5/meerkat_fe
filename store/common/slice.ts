import { createSlice } from '@reduxjs/toolkit';
import { CommonState } from './CommonState';


export const initialState: CommonState = {
    user: {},
};

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
    }
});

