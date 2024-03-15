import {createSlice} from "@reduxjs/toolkit";
import {NotificationState} from "@/store/notification/types";
import {asyncAddNotification} from "@/store/notification/asyncThunk";

export const initialState: NotificationState = {
    loading: {
        addNotification: false
    },
    addNotification: {
        address: {
            userAddress: '',
            bcode: '',
            postNo: '',
            bname: '',
            sigunguCode: ''
        },
        name: '',
        time: '',
    }
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(asyncAddNotification.pending, (state, action) => {
            state.loading.addNotification = true
        })
        builder.addCase(asyncAddNotification.fulfilled, (state, action) => {
            state.loading.addNotification = false
        })
        builder.addCase(asyncAddNotification.rejected, (state, action) => {
            state.loading.addNotification = false
        })
    }
})

export const {} = notificationSlice.actions