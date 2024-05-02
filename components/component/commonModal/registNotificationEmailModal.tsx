import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ayncSendAddressCheckEmail} from "@/store/member/asyncThunk";
import _ from 'lodash';

interface Props {
    openModal: boolean
    onOpenChange: () => void
    handleNotiEmailChange: (e: any) => void
    handleRegistNotiEmail: () => void
    notiEmail: any
    setNotiEmail: any

}

const RegistNotificationEmailModal = (props: Props) => {
    // @ts-ignore
    const { memberProfile } = useSelector(state => state.member)
    const [emailInputDisable, setEmailInputDisable] = useState(false)
    const [useKakaoEmailBtnDisable, setUseKakaoEmailBtnDisable] = useState(false)
    const [addressCheckBtnDisable, setAddressCheckBtnDisable] = useState(false)
    const [emailValid, setEmailValid] = useState(true)
    const [isAddressCheck, setIsAddressCheck] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!props.openModal) {
            setEmailInputDisable(false)
            setUseKakaoEmailBtnDisable(false)
            setAddressCheckBtnDisable(false)
            setEmailValid(false)
            setIsAddressCheck(false)
        }
    }, [props.openModal]);

    useEffect(() => {
        setEmailValid(validEmail(props.notiEmail))

    }, [props.notiEmail]);

    const handleUseKakaoEmailAsNotiEmail = () => {
        props.setNotiEmail(memberProfile.email)
        setEmailInputDisable(true)
        setUseKakaoEmailBtnDisable(true)
    }

    const handleCheckEmailAddress = () => {
        setUseKakaoEmailBtnDisable(true)
        setAddressCheckBtnDisable(true)
        setEmailInputDisable(true)

        const param = {
            handleSuccess: () => {
                alert('해당 메일로 주소 확인 메일이 전송 되었습니다.')
                setIsAddressCheck(true)
            },
            email: props.notiEmail
        }

        // @ts-ignore
        dispatch(ayncSendAddressCheckEmail(param))
    }

    const validEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (_.isEmpty(email)) {
            return false
        }
        if(regex.test(email)) {
            return false
        }

        return true
    }

    return (
        <>
            <Dialog modal={true} defaultOpen={false} open={props.openModal} onOpenChange={props.onOpenChange}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>메일 주소 등록</DialogTitle>
                        <DialogDescription>
                            메일 등록 전, 주소 확인 메일을 수신하여 메일 주소를 확인해 주세요.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Button disabled={useKakaoEmailBtnDisable} className="w-2/4 bg-amber-300 text-black hover:bg-amber-200" size={'sm'} type="submit" onClick={handleUseKakaoEmailAsNotiEmail}>
                                카카오 이메일 사용
                            </Button>
                        </div>
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <Input id="input2" placeholder="알람을 받을 이메일 주소를 입력해 주세요."
                                       disabled={emailInputDisable}
                                       onChange={props.handleNotiEmailChange} value={props.notiEmail}/>
                                <Button onClick={handleCheckEmailAddress} disabled={addressCheckBtnDisable && !emailValid} >주소 확인</Button>
                            </div>
                        </div>
                        <Button className="w-full" disabled={emailValid || !isAddressCheck} type="submit" onClick={props.handleRegistNotiEmail}>
                            등록
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default RegistNotificationEmailModal