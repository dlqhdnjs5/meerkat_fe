import {createAsyncThunk} from '@reduxjs/toolkit';
import {memberApi} from '../../api/member-api';

export const isExistMember = createAsyncThunk(
	'member/exist',
	async (email: string) => {
		const resp = await memberApi.isExistMember(email)
		return resp.data;
	}
)

export const ayncSendAddressCheckEmail = createAsyncThunk(
	'member/SEND_ADDRESS_CHECH_EMAIL',
	async (parameterWithHandler: any, thunkAPI) => {
		const {email, handleSuccess} = parameterWithHandler
		return await memberApi.sendAddressCheckEmail(email)
			.then(value => {
				handleSuccess && handleSuccess(value.data)
			})
			.catch(error => {
				handleCommonError(error)
			})
	}
)
const handleCommonError = (error: any) => {
	const errorCode = error.response?.data?.errorCode;
	switch (errorCode) {
		case 'AUTHENTICATION_REQUIRED':
			alert('로그인이 필요합니다. 로그인 화면으로 이동합니다.')
			window.location.href = '/login?status=NONE';
			break;
		default:
			alert('시스템 오류가 발생하였습니다.');
	}
}
