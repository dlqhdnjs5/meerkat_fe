export interface NotificationState {
    addNotification: AddNotificationInfo
    loading: {
        addNotification: boolean
    }
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