import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface Props {
    openModal: boolean
    isDaumPostCodeView: boolean
    onOpenChange: (isOpen: boolean) => void
    daumPostCodeContent: any
    handleNotiNameChange: (e: any) => void
    handleNotiTimeChange: (e: any) => void
    handleAddNotifiaction: () => void
    handleOpenDaumApiModal: () => void
    notiName: string
    notiTime: string
    addNotificationAddressInfo: any
}

const AddNotificationModal = (props: Props) => {
    const hours = Array.from({length: 24}, (_, index) => index.toString())

    return (
        <Dialog modal={true} defaultOpen={false} open={props.openModal} onOpenChange={props.onOpenChange}>
            {props.isDaumPostCodeView ? props.daumPostCodeContent() :
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>알람 생성</DialogTitle>
                        <DialogDescription>실시간 거래 정보를 알고싶은 지역의 알람을 받아 보세요</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="input1">주소</Label>
                            <div className="flex gap-2">
                                <Input className="w-3/4" id="input1" readOnly={true} placeholder="주소" value={props.addNotificationAddressInfo?.userAddress} />
                                <Button onClick={props.handleOpenDaumApiModal}>주소 찾기</Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="input2">알람 제목</Label>
                            <Input id="input2" placeholder="알람에 대한 제목을 입력해 주세요." onChange={props.handleNotiNameChange} value={props.notiName}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="input3">알람 시각</Label>
                            <Select onValueChange={props.handleNotiTimeChange} value={props.notiTime}>
                                <SelectTrigger>
                                    <SelectValue>{props.notiTime} 시</SelectValue>
                                </SelectTrigger>
                                <SelectContent >
                                    {hours.map(value => <SelectItem key={value} value={value}>{value} 시</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className="w-full" type="submit" onClick={props.handleAddNotifiaction}>
                            생성
                        </Button>
                    </div>
                </DialogContent>}
        </Dialog>
    )
}

export default AddNotificationModal