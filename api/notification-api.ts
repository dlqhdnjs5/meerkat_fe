import {API} from './index';

const addNotification = async (addNotificationParam: any) => {
    return await API.post('/mapi/notifications', addNotificationParam)
}
const getNotifications = async () => {
    return await API.get('/mapi/notifications')
}



export const notificationApi = {
    addNotification,
    getNotifications
}