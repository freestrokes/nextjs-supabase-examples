import { Result } from '@/types/Common';
import axios, {AxiosInstance} from 'axios';

const API_URL = '/posts';

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

export const BoardService = {

	/**
	 * Get Board List
	 * @param param
	 */
	getBoardList: async (param: any) => {
		// pagination total count 사용을 위해 headers 설정.
		// response > headers > x-total-count 값을 사용.
		const {data, headers} = await axiosInstance.get<Result<any>>(
			`${API_URL}?q=${param.keyword}&_start=${(param.page-1) * param.size}&_limit=${param.size}`,
			{}
		);

		return {data, headers};
	},

	/**
	 * Get Board Detail
	 * @param id
	 */
	getBoardDetail: async (param: any) => {
		const {data} = await axiosInstance.get<Result<any>>(
			`${API_URL}/${param}`,
			{}
		);

		return data;
	},

	/**
	 * Create Board
	 * @param param
	 */
	createBoard: async (param: any) => {
		const {data} = await axiosInstance.post<Result<any>>(
			`${API_URL}`,
			param
		);

		return data;
	},

	/**
	 * Update Board
	 * @param param
	 */
	updateBoard: async (param: any) => {
		const {data} = await axiosInstance.put<Result<any>>(
			`${API_URL}/${param.id}`,
			param
		);

		return data;
	},

	/**
	 * Delete Board
	 * @param param
	 */
	deleteBoard: async (param: any) => {
		const {data} = await axiosInstance.delete<Result<any>>(
			`${API_URL}/${param}`,
		);

		return data;
	},

}
