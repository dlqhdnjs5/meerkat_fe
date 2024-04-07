import {createAsyncThunk} from "@reduxjs/toolkit";
import {notificationApi} from "@/api/notification-api";

export const asyncAddNotification = createAsyncThunk(
    'notification/ADD_NOTIFICATION',
    async (parameterWithHandler: any, thunkAPI) => {
        const {param, handleSuccess} = parameterWithHandler
        notificationApi.addNotification(param)
            .then(value => {
                handleSuccess()
            }).catch(error => {
                handleCommonError(error)
            })
    }
)

export const asyncModifyNotification = createAsyncThunk(
    'notification/MODIFY_NOTIFICATION',
    async (parameterWithHandler: any, thunkAPI) => {
        const {param, handleSuccess} = parameterWithHandler
        notificationApi.modifyNotification(param)
            .then(value => {
                handleSuccess()
            }).catch(error => {
            handleCommonError(error)
        })
    }
)

export const asyncGetNotifications = createAsyncThunk(
    'notification/GET_NOTIFICATIONS',
    async (_ , thunkAPI) => {
        return await notificationApi.getNotifications()
            .catch(error => {
                handleCommonError(error)
            })
    }
)

export const asyncGetNotification = createAsyncThunk(
    'notification/GET_NOTIFICATION',
    async (parameterWithHandler: any , thunkAPI) => {
        const {notificationNo, handleSuccess} = parameterWithHandler
        return await notificationApi.getNotification(notificationNo)
            .then(value => {
                console.log(value.data)
                handleSuccess(value.data)
            })
            .catch(error => {
                handleCommonError(error)
            })
    }
)

export const asyncRemoveNotifications = createAsyncThunk(
    'notification/REMOVE_NOTIFICATION',
    async (parameterWithHandler: any , thunkAPI) => {
        const {notificationNo, handleSuccess} = parameterWithHandler
        return await notificationApi.removeNotifications(notificationNo)
            .then(value => {
                handleSuccess()
            })
            .catch(error => {
                handleCommonError(error)
            })
    }
)

const handleCommonError = (error: any) => {
    const errorCode = error.response?.data?.errorCode;
    switch (errorCode) {
        case 'AUTHENTICATION_REQUIRED':
            alert('로그인이 필요합니다. 로그인 화면으로 이동합니다.')
            window.location.href = '/login';
            break;
        default:
            alert('시스템 오류가 발생하였습니다.');
    }
}