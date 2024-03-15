import {createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "./index";

export const asyncUpFetch = createAsyncThunk(
  'admin/asyncUpFetch',
  async () => {
    const resp = await API.get('/mapi/getTestValue/test');
    console.log('resp : ', resp);
    return resp.data;
  }

)