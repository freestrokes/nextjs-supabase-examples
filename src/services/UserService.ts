// import {instance} from '@hooks/useAxiosLoader';
import { Result } from '@/types/Common';
// import {createAsyncThunk} from '@reduxjs/toolkit';
import axios, {AxiosInstance} from 'axios';

const API_URL = `/users`;

export const axiosInstance: AxiosInstance = axios.create({
	baseURL: '',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Access-Control-Allow-Origin': '*',
		// 'x-api-key': process.env.REACT_APP_API_KEY,
		// 'Authorization': `Basic ${process.env.REACT_APP_API_TOKEN}`
	},
});

export const UserService = {

	/**
	 * Get User
	 * @param id
	 */
	getUser: async (id: number) => {
		const {data} = await axiosInstance.get<Result<any>>(
			`${API_URL}/${id}`,
			{}
		);

		return data;
	},

	/**
	 * Get Users
	 * @param param
	 */
	getUsers: async (param: any) => {
		// pagination total count 사용을 위해 headers 설정.
		// response > headers > x-total-count 값을 사용.
		const {data, headers} = await axiosInstance.get<Result<any>>(
			`${API_URL}?q=${param.keyword}&_start=${(param.page-1) * param.size}&_limit=${param.size}`,
			{}
		);

		return {data, headers};
	},

	/**
	 * Get User (Redux Toolkit)
	 */
	// getUserForRTK: createAsyncThunk(
	// 	'user/getUser',
	// 	async(userId: string, thunkApi: any) => {
	// 		const {data} = await axiosInstance.get(
	// 			`${API_URL}/${userId}`
	// 		);
	// 		return data;
	// 	}
	// ),

}
