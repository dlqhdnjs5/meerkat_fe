import {createAsyncThunk} from "@reduxjs/toolkit";
import {notificationApi} from "@/api/notification-api";

export const asyncAddNotification = createAsyncThunk(
    'notification/add',
    async (parameter: any, thunkAPI) => {
        const {param, handleSuccess} = parameter
        notificationApi.addNotification(param)
            .then(value => {
                handleSuccess()
            }).catch(reason => {
                alert('시스템 오류가 발생하였습니다.')
        })

    }
)

export const asyncGetNotifications = createAsyncThunk(
    'notification/get',
    async (_ , thunkAPI) => {
        return await notificationApi.getNotifications()
    }
)