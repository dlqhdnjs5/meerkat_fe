import {createAsyncThunk} from '@reduxjs/toolkit';
import {memberApi} from '../../api/member-api';

export const isExistMember = createAsyncThunk(
	'member/exist',
	async (email: string) => {
		const resp = await memberApi.isExistMember(email)
		return resp.data;
	}
)