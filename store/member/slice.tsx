import {MemberProfile, MemberState} from './types';
import {createSlice} from '@reduxjs/toolkit';
import {ayncSendAddressCheckEmail} from "@/store/member/asyncThunk";

export const initialState: MemberState = {
	memberProfile: {
		memberNo: '',
		email: '',
		notificationEmail: '',
		name: '',
		imgPath: '',
		statusCode: 'USER',
		typeCode: 'ACTIVE',
		lastLoginTime: '',
		jwtToken: '',
	}
}

function initMemberProfile(): MemberProfile {
	return {
		memberNo: '',
		email: '',
		notificationEmail: '',
		name: '',
		imgPath: '',
		statusCode: 'USER',
		typeCode: 'ACTIVE',
		lastLoginTime: '',
		jwtToken: ''
	}
}

export const memberSlice = createSlice({
	name: 'member',
	initialState,
	reducers: {
		setMemberProfile: (state, action) => {
			state.memberProfile = action.payload
		},
		resetMemberProfile: (state) => {
			state.memberProfile = initMemberProfile()
		}
	},
	extraReducers: builder => {
		builder.addCase(ayncSendAddressCheckEmail.pending, (state, _) => {
		})
		builder.addCase(ayncSendAddressCheckEmail.fulfilled, (state, _) => {
		})
		builder.addCase(ayncSendAddressCheckEmail.rejected, (state, _) => {
		})
	}
})

export const getMemberProfiles = (state: MemberState) => state.memberProfile


export const { setMemberProfile, resetMemberProfile } = memberSlice.actions