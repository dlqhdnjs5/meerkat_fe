export interface NotificationState {
    addNotification: AddNotificationInfo
    loading: {
        addNotification: boolean
        getNotifications: boolean
    }
    notificationList: any
}

export interface NotificationAddress {
    postNo: string
    bcode: string
    bname: string
    sigunguCode: string
    userAddress: string
}

export interface AddNotificationInfo {
    address: NotificationAddress
    name: string
    time: string
}

export interface NotificationInfo {
    notificationNo: number,
    memberNo: string,
    name: string,
    bname: string,
    bcode: number,
    postNo: number,
    sigunguCode: number,
    userAddress: string
    notiTime: string,
    enable: boolean,
}