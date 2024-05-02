import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import _ from 'lodash';
import React, {JSX, SVGProps, useEffect, useState} from "react";
import DaumPostcode, {Address} from 'react-daum-postcode';
import {NotificationAddress, NotificationInfo} from "@/store/notification/types";
import {useDispatch, useSelector} from "react-redux";
import {
    asyncAddNotification,
    asyncGetNotification,
    asyncGetNotifications,
    asyncModifyNotification,
    asyncRemoveNotifications
} from "@/store/notification/asyncThunk";
import ModifyNotificationModal from "@/components/component/notificationModal/modifyNotificationModal";
import AddNotificationModal from "@/components/component/notificationModal/addNotificationModal";
import RegistNotificationEmailModal from "@/components/component/commonModal/registNotificationEmailModal";

export function DashBoard() {
  const dispatch = useDispatch<any>()
  // @ts-ignore
  const { notificationList, notification } = useSelector(state => state.notification)
  const [isDaumPostCodeView, setIsDaumPostCodeView] = useState<boolean>(false)
  const [addNotificationAddressInfo, setAddNotificationAddressInfo] = useState<NotificationAddress>()
  const [notiName, setNotiname] = useState('')
  const [notiTime, setNotiTime] = useState('')
  const [notiEmail, setNotiEmail] = useState('')
  const [notificationInfo, setNotificationInfo] = useState<any>()
  const [openModifyModal, setOpenModifyModal] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openRegistNotificationEmailModal, setOpenRegistNotificationEmailModal] = useState(false)
  const postCodeStyle = {
    width: '400px',
    height: '400px',
  }
  const initNotificationAddressInfo = {userAddress: "", bcode: "", bname: "", postNo: "", sigunguCode: ""}

  useEffect(() => {
    dispatch(asyncGetNotifications())
  }, [])

  const initNotificationParameter = () => {
    setAddNotificationAddressInfo(initNotificationAddressInfo)
    setNotiname('')
    setNotiTime('')
    setNotificationInfo({})
  }

  const handleAddNotificationModalOpenChange = (isOpen: boolean) => {
    setIsDaumPostCodeView(false)

    if (!isOpen) {
      setOpenAddModal(false)
      initNotificationParameter()
    }
  }

  const handleModifyNotificationModalOpenChange = () => {
    initNotificationParameter()
    setNotificationInfo({})
    setOpenModifyModal(!openModifyModal)
  }

  const handleSelectPostCodeComplete = (data: Address) => {
    let address: string

    if (data.userSelectedType === 'R') {
      address = data.roadAddress
    } else {
      address = data.jibunAddress
    }

    setAddNotificationAddressInfo({
      postNo: data.zonecode,
      bcode: data.bcode,
      bname: data.bname,
      sigunguCode: data.sigunguCode,
      userAddress: address
    })

    setIsDaumPostCodeView(false)
  }

  const validNotificationInfo = (notificationInfo: any) => {
    for (const key in notificationInfo) {
      if (notificationInfo.hasOwnProperty(key)) {
        if (typeof notificationInfo[key] == "boolean") {
          if (notificationInfo[key] == null || notificationInfo[key] == 'undefined') {
            return false
          }
        } else if (_.isEmpty(notificationInfo[key])) {
          return false
        }
      }
    }
    return true
  }

  const handleAddNotifiaction = () => {
    const param = {
      notiTime,
      name: notiName,
      ...addNotificationAddressInfo
    }

    if (!validNotificationInfo(param)) {
      alert('알람 정보를 모두 기입해 주세요.')
      return
    }

    const handleAddNotificationSuccess = () => {
      initNotificationParameter()
      alert('알람을 생성 하였습니다.')
      dispatch(asyncGetNotifications())
      setOpenAddModal(false)
    }

    const parameter = {
      handleSuccess: handleAddNotificationSuccess,
      param
    }

    dispatch(asyncAddNotification(parameter))
  }

  const handleModifyNotification = () => {
    console.log('ss : ', notificationInfo)

    const param = {
      notificationNo: notificationInfo.notificationNo,
      notiTime,
      name: notiName,
      enable: notificationInfo.enable
    }

    if (!validNotificationInfo(param)) {
      alert('알람 정보를 모두 기입해 주세요.')
      return
    }

    const handleModifyNotificationSuccess = () => {
      initNotificationParameter()
      alert('알람을 수정 하였습니다.')
      dispatch(asyncGetNotifications())
      setOpenModifyModal(false)
    }

    const parameter = {
      handleSuccess: handleModifyNotificationSuccess,
      param
    }

    dispatch(asyncModifyNotification(parameter))
  }

  const handleNotiEmailChange = (e:any) => {
    setNotiEmail(e.target.value)
  }

  const handleRegistNotiEmail = () => {
    console.log('regist email')
  }

  const handleNotiEmailModalOpenChange = () => {
    setOpenRegistNotificationEmailModal(!openRegistNotificationEmailModal)
    setNotiEmail('')
  }

  const handleNotiNameChange = (e: any) => {
    setNotiname(e.target.value)
  }

  const handleNotiTimeChange = (notiTime: any) => {
    setNotiTime(notiTime)
  }

  const handleOpenModifyModal = (notificationNo: number) => {
    const handleGetNotificationSuccess = (response: NotificationInfo) => {
      setNotificationInfo(response)
      setNotiname(response.name)
      setNotiTime(response.notiTime)
    }

    const param = {
      handleSuccess: handleGetNotificationSuccess,
      notificationNo: notificationNo
    }

    dispatch(asyncGetNotification(param))
    setOpenModifyModal(!openModifyModal)
  }

  const handleRemoveNotification = (notificationNo: number) => {
    if(confirm('해당 알람을 삭제하시겠습니까?')) {
      const handleRemoveNotificationSuccess = () => {
        alert('알람을 삭제하였습니다.')
        dispatch(asyncGetNotifications())
      }

      const parameter = {
        handleSuccess: handleRemoveNotificationSuccess,
        notificationNo
      }

      dispatch(asyncRemoveNotifications(parameter))
    }
  }



  const toggleNotification = (notification: NotificationInfo) => {
    const message = notification.enable ? '알람을 비활성화 하시겠습니까?' : '알람을 활성화 하시겠습니까?'

    if (!confirm(message)) { return }

    const param = {
      notificationNo: notification.notificationNo,
      notiTime: notification.notiTime,
      name: notification.name,
      enable: !notification.enable
    }

    const handleToggleNotificationSuccess = () => {
      dispatch(asyncGetNotifications())
    }

    const parameter = {
      handleSuccess: handleToggleNotificationSuccess,
      param
    }

    dispatch(asyncModifyNotification(parameter))
  }

  const notificationCard = (notification: NotificationInfo) => {
    const enableCardColor = 'bg-white'
    const disableCardColor = 'bg-red-400'

    return (
        <Card key={notification.notificationNo} className={`transition-colors duration-300 ease-in-out ${notification.enable ? enableCardColor : disableCardColor} dark:bg-gray-900`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{notification.name}</CardTitle>
            <div className="flex gap-2">
              <Button
                  className="h-6 w-6 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => handleOpenModifyModal(notification.notificationNo)}
                  size="icon"
                  variant="ghost"
              >
                <PencilIcon className="w-4 h-4"/>
              </Button>
              <Button className="h-6 w-6 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => handleRemoveNotification(notification.notificationNo)} size="icon" variant="ghost">
                <TrashIcon className="w-4 h-4"/>
              </Button>
              <Button className="h-6 w-6 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => toggleNotification(notification)} size="icon" variant="ghost">
                <ToggleRightIcon className="w-4 h-4"/>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notification.userAddress}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{notification.notiTime} 시</p>
          </CardContent>
        </Card>
    )
  }

  const daumPostCodeContent = () => {
    return (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>주소 검색</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-4 md:grid-cols-1">
              <div className="grid gap-4 py-4">
                <div>
                  <DaumPostcode
                      style={postCodeStyle}
                      onComplete={handleSelectPostCodeComplete}
                  >
                  </DaumPostcode>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
    )
  }

  const handleClickAddNotificationModalCard = () => {
    if (!openAddModal) {
      setOpenAddModal(true)
    }
  }

  const addNotificationModalCard = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2">
              <Card
                  onClick={() => handleClickAddNotificationModalCard()}
                  className="transition-colors duration-300 ease-in-out bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">새로운 알람을 추가해 보세요!</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">알람 생성</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">거래 현황 알람은 최대 5개까지 생성 가능합니다.</p>
                </CardContent>
              </Card>
        </div>
    )
  }

  return (
      <div className="flex flex-col w-full min-h-screen">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
          <div className="bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-500 dark:text-gray-400">시군구 아파트 거래정보 알림을 받을 이메일을 먼저 등록해 주세요.</div>
              <Button variant={'default'} onClick={() => setOpenRegistNotificationEmailModal(true)}>이메일 등록</Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {notificationList ? notificationList.map((notification: NotificationInfo) => (
                notificationCard(notification)
            )) : <></>}
          </div>
          <div>
            {notificationList && notificationList.length < 5 ?
                <div>{addNotificationModalCard()}</div> : <div></div>
            }
          </div>
        </main>
        <AddNotificationModal openModal={openAddModal} isDaumPostCodeView={isDaumPostCodeView} onOpenChange={handleAddNotificationModalOpenChange} daumPostCodeContent={daumPostCodeContent}
                              handleNotiNameChange={handleNotiNameChange} handleNotiTimeChange={handleNotiTimeChange} handleAddNotifiaction={handleAddNotifiaction}
                              handleOpenDaumApiModal={() => setIsDaumPostCodeView(true)} notiName={notiName} notiTime={notiTime} addNotificationAddressInfo={addNotificationAddressInfo}/>
        <ModifyNotificationModal openModal={openModifyModal} onOpenChange={handleModifyNotificationModalOpenChange}
                                 handleNotiNameChange={handleNotiNameChange}
                                 handleNotiTimeChange={handleNotiTimeChange}
                                 handleModifyNotification={handleModifyNotification} notiName={notiName}
                                 notiTime={notiTime} notificationInfo={notificationInfo}/>
        <RegistNotificationEmailModal openModal={openRegistNotificationEmailModal}
                                      onOpenChange={handleNotiEmailModalOpenChange}
                                      handleRegistNotiEmail={handleRegistNotiEmail}
                                      setNotiEmail={setNotiEmail}
                                      handleNotiEmailChange={handleNotiEmailChange} notiEmail={notiEmail}/>
      </div>
  )
}

const PencilIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
        <path d="m15 5 4 4"/>
      </svg>
  )
}


const TrashIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <path d="M3 6h18"/>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
      </svg>
  )
}


const ToggleRightIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <rect width="20" height="12" x="2" y="6" rx="6" ry="6"/>
        <circle cx="16" cy="12" r="2" />
      </svg>
  )
}
