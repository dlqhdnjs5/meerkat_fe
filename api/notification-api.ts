import { API } from './index';
import {AddNotificationInfo} from "@/store/notification/types";

const addNotification = async (addNotificationParam: any) => {
    const response = await API.post('/mapi/notifications', addNotificationParam)
    return response.data
}


export const notificationApi = {
    addNotification
}