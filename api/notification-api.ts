import {API} from './index';

const addNotification = async (addNotificationParam: any) => {
    return await API.post('/mapi/notifications', addNotificationParam)
}

const modifyNotification = async (modifyNotificationParam: any) => {
    return await API.put('/mapi/notifications', modifyNotificationParam)
}

const getNotifications = async () => {
    return await API.get('/mapi/notifications')
}

const getNotification = async (notificationNo: any) => {
    return await API.get(`/mapi/notifications/${notificationNo}`)
}

const removeNotifications = async (notificationNo: any) => {
    return await API.delete(`/mapi/notifications/${notificationNo}`)
}



export const notificationApi = {
    addNotification,
    getNotifications,
    getNotification,
    removeNotifications,
    modifyNotification
}