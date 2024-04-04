import {API} from './index';

const addNotification = async (addNotificationParam: any) => {
    return await API.post('/mapi/notifications', addNotificationParam)
}
const getNotifications = async () => {
    return await API.get('/mapi/notifications')
}

const removeNotifications = async (notificationNo: any) => {
    return await API.delete(`/mapi/notifications/${notificationNo}`)
}



export const notificationApi = {
    addNotification,
    getNotifications,
    removeNotifications
}