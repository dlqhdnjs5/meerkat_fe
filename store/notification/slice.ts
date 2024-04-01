import {createSlice} from "@reduxjs/toolkit";
import {NotificationState} from "@/store/notification/types";
import {asyncAddNotification, asyncGetNotifications} from "@/store/notification/asyncThunk";

export const initialState: NotificationState = {
    loading: {
        addNotification: false,
        getNotifications: false
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
    },
    notificationList: []
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
        builder.addCase(asyncGetNotifications.pending, (state, action) => {
            state.loading.getNotifications = true
        })
        builder.addCase(asyncGetNotifications.fulfilled, (state, action) => {
            state.loading.getNotifications = false
            state.notificationList = action.payload.data
        })
        builder.addCase(asyncGetNotifications.rejected, (state, action) => {
            state.loading.getNotifications = false
        })
    }
})

export const {} = notificationSlice.actions