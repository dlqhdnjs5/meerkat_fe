import { API } from './index';

const isExistMember = async (email: string) => {
	const response = await API.get('/mapi/members/exist', {
		params: {email}
	})

	return response.data
}

const loginMember = async (kakaoAccount: any) => {
	return await API.post('/mapi/members/login', kakaoAccount)
	.then(response => {
		return response.data
	})
}

const logoutMember = async () => {
	return await API.get('/mapi/members/logout')
		.then(response => {
			return response.data
		})
}

const sendAddressCheckEmail = async (email: string) => {
	return await API.post('/mapi/members/send/address-check/mail', email)
		.then(response => {
			return response.data
		})
}


export const memberApi = {
	isExistMember,
	loginMember,
	logoutMember,
	sendAddressCheckEmail,
}