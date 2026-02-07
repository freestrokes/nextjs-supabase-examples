// import {useCallback, useEffect, useMemo, useState} from 'react';
import axios, { AxiosInstance } from 'axios';
// import Cookies from 'js-cookie';
// import {useAppSelector} from '@store/config';

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

// export const useAxiosLoader = () => {
//
// 	// userInfoId
// 	// const {userInfoId} = useAppSelector(state => state.common);
//
//   const [counter, setCounter] = useState(0);
//   const inc = useCallback(() => setCounter(counter => counter + 1), [setCounter]); // add to counter
//   const dec = useCallback(() => setCounter(counter => counter - 1), [setCounter]); // remove from counter
//
//   const interceptors = useMemo(() => ({
//     request: async (config: any) => {
// 	    config.withCredentials = false;
// 	    config.headers["xsrf-token"] = Cookies.get('XSRF-TOKEN');
// 	    inc();
//
//       console.log('useAxiosLoader > config >>>> ', config);
//
//       // if (!config.url.includes('/sign-in-sns') && !config.url.includes('/oauth/token') && !config.url.includes('/users/exist') && !config.url.includes('/sign-up')) {
//       //   const accessToken = await localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
//       //   console.log(accessToken)
//       //   if (accessToken) {
// 		  //     config.headers["withCredentials"]= true;
// 			//     config.withCredentials = true;
//       //   } else {
//       //   }
//       // }
//
//       return config;
//     },
//     response: (response: any) => (dec(), response),
//     error: (error: any) => (dec(), Promise.reject(error)),
//   }), [inc, dec]); // create the interceptors
//
//   useEffect(() => {
//     // add request interceptors
//     const reqInterceptor = instance.interceptors.request.use(interceptors.request, interceptors.error);
//     // add response interceptors
//     const resInterceptor = instance.interceptors.response.use(interceptors.response, interceptors.error);
//     return () => {
//       // remove all intercepts when done
//       instance.interceptors.request.eject(reqInterceptor);
// 	    instance.interceptors.response.eject(resInterceptor);
//     };
//   }, [interceptors]);
//
//   return [counter > 0, true];
// };
