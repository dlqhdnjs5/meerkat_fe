import { MemberProfile, MemberState } from './types';
import { createSlice } from '@reduxjs/toolkit';

export const initialState: MemberState = {
	memberProfile: {
		memberNo: '',
		email: '',
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
	}
})

export const getMemberProfiles = (state: MemberState) => state.memberProfile


export const { setMemberProfile, resetMemberProfile } = memberSlice.actions