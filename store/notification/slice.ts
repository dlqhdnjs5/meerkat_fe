import {createSlice} from "@reduxjs/toolkit";
import {NotificationState} from "@/store/notification/types";
import {asyncAddNotification, asyncGetNotifications, asyncRemoveNotifications} from "@/store/notification/asyncThunk";

export const initialState: NotificationState = {
    loading: {
        addNotification: false,
        getNotifications: false,
        removeNotifications: false
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
        builder.addCase(asyncAddNotification.pending, (state, _) => {
            state.loading.addNotification = true
        })
        builder.addCase(asyncAddNotification.fulfilled, (state, _) => {
            state.loading.addNotification = false
        })
        builder.addCase(asyncAddNotification.rejected, (state, _) => {
            state.loading.addNotification = false
        })
        builder.addCase(asyncGetNotifications.pending, (state, _) => {
            state.loading.getNotifications = true
        })
        builder.addCase(asyncGetNotifications.fulfilled, (state, action) => {
            state.loading.getNotifications = false
            const payload = action.payload || {}
            state.notificationList = payload?.data
        })
        builder.addCase(asyncGetNotifications.rejected, (state, _) => {
            state.loading.getNotifications = false
        })
        builder.addCase(asyncRemoveNotifications.pending, (state, _) => {
            state.loading.removeNotifications = true
        })
        builder.addCase(asyncRemoveNotifications.fulfilled, (state, _) => {
            state.loading.removeNotifications = false
        })
        builder.addCase(asyncRemoveNotifications.rejected, (state, _) => {
            state.loading.removeNotifications = false
        })
    }
})

export const {} = notificationSlice.actions