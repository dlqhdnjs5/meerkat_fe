import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import _ from 'lodash';
import {JSX, SVGProps, useEffect, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import DaumPostcode, {Address} from 'react-daum-postcode';
import {NotificationAddress, NotificationInfo} from "@/store/notification/types";
import {useDispatch, useSelector} from "react-redux";
import {
  asyncAddNotification,
  asyncGetNotification,
  asyncGetNotifications, asyncModifyNotification,
  asyncRemoveNotifications
} from "@/store/notification/asyncThunk";

export function DashBoard() {
  const dispatch = useDispatch<any>()
  // @ts-ignore
  const { notificationList, notification } = useSelector(state => state.notification)
  const [isDaumPostCodeView, setIsDaumPostCodeView] = useState<boolean>(false)
  const [addNotificationAddressInfo, setAddNotificationAddressInfo] = useState<NotificationAddress>()
  const [notiName, setNotiname] = useState('')
  const [notiTime, setNotiTime] = useState('')
  const [notificationInfo, setNotificationInfo] = useState<any>()
  const [openModifyModal, setOpenModifyModal] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const postCodeStyle = {
    width: '400px',
    height: '400px',
  }
  const hours = Array.from({length: 24}, (_, index) => index.toString())
  const initNotificationAddressInfo = {userAddress: "", bcode: "", bname: "", postNo: "", sigunguCode: ""}

  useEffect(() => {
    dispatch(asyncGetNotifications())
  }, [])


  const handleOpenModal = () => {
    setIsDaumPostCodeView(true)
  }

  const initNotificationParameter = () => {
    setAddNotificationAddressInfo(initNotificationAddressInfo)
    setNotiname('')
    setNotiTime('')
    setNotificationInfo({})
  }

  const handleAddNotificationModalOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setOpenAddModal(true)
      setIsDaumPostCodeView(false)
    } else {
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
        if (_.isEmpty(notificationInfo[key])) {
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
    const param = {
      notificationNo: notificationInfo.notificationNo,
      notiTime,
      name: notiName
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

  const notificationCard = (notification: NotificationInfo) => {
    return (
        <Card key={notification.notificationNo} className="transition-colors duration-300 ease-in-out bg-white dark:bg-gray-900">
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
              <Button className="h-6 w-6 hover:bg-gray-100 dark:hover:bg-gray-800" size="icon" variant="ghost">
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

  const modifyModal = (openModal: boolean) => {
    return (
        <Dialog modal={false} defaultOpen={false} open={openModal} onOpenChange={handleModifyNotificationModalOpenChange}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>알람 수정</DialogTitle>
              <DialogDescription>주소 이외 정보만 수정 가능합니다.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="input1">주소</Label>
                <div className="flex gap-2">
                  <Input className="w-3/4" id="input1" readOnly={true} placeholder="주소"
                         value={notificationInfo?.userAddress}/>
                  <Button disabled={true}>주소 찾기</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="input2">알람 제목</Label>
                <Input id="input2" placeholder="알람에 대한 제목을 입력해 주세요." onChange={handleNotiNameChange} value={notiName}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="input3">알람 시각</Label>
                <Select onValueChange={handleNotiTimeChange} value={notiTime}>
                  <SelectTrigger>
                    <SelectValue>{notiTime} 시</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map(value => <SelectItem key={value} value={value}>{value} 시</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" type="submit" onClick={handleModifyNotification}>
                수정
              </Button>
            </div>
          </DialogContent>
        </Dialog>)
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

  const addNotificationModalInputContent = () => {
    return (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>알람 생성</DialogTitle>
            <DialogDescription>실시간 거래 정보를 알고싶은 지역의 알람을 받아 보세요</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="input1">주소</Label>
              <div className="flex gap-2">
                <Input className="w-3/4" id="input1" readOnly={true} placeholder="주소" value={addNotificationAddressInfo?.userAddress} />
                <Button onClick={handleOpenModal}>주소 찾기</Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="input2">알람 제목</Label>
              <Input id="input2" placeholder="알람에 대한 제목을 입력해 주세요." onChange={handleNotiNameChange} value={notiName}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="input3">알람 시각</Label>
              <Select onValueChange={handleNotiTimeChange} value={notiTime}>
                <SelectTrigger>
                  <SelectValue>{notiTime} 시</SelectValue>
                </SelectTrigger>
                <SelectContent >
                  {hours.map(value => <SelectItem key={value} value={value}>{value} 시</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" type="submit" onClick={handleAddNotifiaction}>
              생성
            </Button>
          </div>
        </DialogContent>
    )
  }

  const addNotificationModalCard = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2">
          <Dialog modal={false}  onOpenChange={handleAddNotificationModalOpenChange} defaultOpen={false} open={openAddModal}>
            <DialogTrigger asChild>
              <Card
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
            </DialogTrigger>
            {isDaumPostCodeView ? daumPostCodeContent() : addNotificationModalInputContent() }
          </Dialog>
        </div>
    )
  }

  return (
      <div className="flex flex-col w-full min-h-screen">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
          <div className="grid gap-4 md:grid-cols-2">
            {notificationList.length ? notificationList.map((notification: NotificationInfo) => (
                notificationCard(notification)
            )) : <></>}
          </div>
          <div>
            {notificationList.length < 5 ?
                <div>{addNotificationModalCard()}</div> : <div></div>
            }
          </div>
        </main>
        {modifyModal(openModifyModal)}
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
        <rect width="20" height="12" x="2" y="6" rx="6" ry="6" />
        <circle cx="16" cy="12" r="2" />
      </svg>
  )
}
