import {createAsyncThunk} from "@reduxjs/toolkit";
import {notificationApi} from "@/api/notification-api";

export const asyncAddNotification = createAsyncThunk(
    'notification/add',
    async (param: any, _) => {
        return notificationApi.addNotification(param);
    }
)