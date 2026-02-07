// import {useQueryClient, useQuery, useMutation, UseQueryResult, UseMutationResult} from 'react-query';
// import {BoardService} from '@services/BoardService';
// import {boardKeys} from '@queries/QueryKeys';
// import {useRecoilValue, useResetRecoilState} from 'recoil';
// import {
// 	boardDetailParamAtom,
// 	boardListParamAtom,
// 	createBoardParamAtom, deleteBoardParamAtom,
// 	updateBoardParamAtom
// } from '@states/atom/BoardAtom';
// import {boardListParamSelector} from '@states/selector/BoardSelector';

import {useMutation, useQuery} from '@tanstack/react-query';
import {PostService} from '@/services/PostService';
import {postQueryKeys} from '@/queries/QueryKeys';

export const useFetchPosts = (param: any) => useQuery({
	queryKey: postQueryKeys.findAll(),
	queryFn: () => PostService.getPosts(param),
  select: (result) => result.data,
  // enabled: enabled ?? false,
});

export const useFetchPost = (id: string) => useQuery({
	queryKey: postQueryKeys.getOne(),
	queryFn: () => PostService.getPost(id),
	select: (result) => result.data,
	// enabled: enabled ?? false,
});

export const useCreatePost = (param: any) => useMutation({
	mutationFn: () => PostService.createPost(param),
	retry: 0,
	onMutate: (variables) => {
		// A mutation is about to happen!
		console.log('onMutate', variables);
		// Optionally return a context containing data to use when for example rolling back
		return {id: 1};
	},
	onError: (error, variables, context) => {
		// An error happened!
		console.log(context);
		// console.log(`rolling back optimistic update with id ${context.id}`)
	},
	// 뮤테이션이 성공한다면, 쿼리의 데이터를 invalidate해 관련된 쿼리가 리패치되도록 만든다.
	onSuccess: (data, variables, context) => {
		// queryClient.invalidateQueries(boardKeys.createWithParam());
	},
	onSettled: (data, error, variables, context) => {
		// Error or success... doesn't matter!
	},
});

export const useDeletePost = () => useMutation({
	mutationFn: (param: any) => PostService.deletePost(param),
	retry: 0,
	onMutate: (variables) => {
	},
	onError: (error, variables, context) => {
	},
	onSuccess: (data, variables, context) => {
		// resetDeleteBoardParamState();
		// queryClient.invalidateQueries(boardKeys.delete());
	},
	onSettled: (data, error, variables, context) => {
	},
});

// export const PostQuery = {
//
// 	// boardQueryClient: () => {
// 	// 	return useQueryClient();
// 	// },
//
// 	useGetBoardListQueryWithParam: (param: any): UseQueryResult => {
// 		const queryClient = useQueryClient();
//
// 		return useQuery(
// 			boardKeys.listWithParam(),
// 			() => BoardService.getBoardList(param),
// 			{
// 				enabled: false,
// 			}
// 		)
// 	},
//
// 	useGetBoardDetailQueryWithParam: (param: any): UseQueryResult => {
// 		const queryClient = useQueryClient();
//
// 		return useQuery(
// 			boardKeys.detailWithParam(),
// 			() => BoardService.getBoardDetail(param),
// 			{
// 				enabled: false,
// 			}
// 		)
// 	},
//
// 	useCreateBoardMutationWithParam: (param: any): UseMutationResult => {
// 		const queryClient = useQueryClient();
//
// 		return useMutation(
// 			boardKeys.createWithParam(),
// 			() => BoardService.createBoard(param),
// 			{
// 				retry: 0,
// 				onMutate: (variables) => {
// 					// A mutation is about to happen!
// 					console.log('onMutate', variables);
// 					// Optionally return a context containing data to use when for example rolling back
// 					return {id: 1};
// 				},
// 				onError: (error, variables, context) => {
// 					// An error happened!
// 					console.log(context);
// 					// console.log(`rolling back optimistic update with id ${context.id}`)
// 				},
// 				// 뮤테이션이 성공한다면, 쿼리의 데이터를 invalidate해 관련된 쿼리가 리패치되도록 만든다.
// 				onSuccess: (data, variables, context) => {
// 					queryClient.invalidateQueries(boardKeys.createWithParam());
// 				},
// 				onSettled: (data, error, variables, context) => {
// 					// Error or success... doesn't matter!
// 				},
// 			}
// 		)
// 	},
//
// 	useGetBoardListQueryWithRecoil: (): UseQueryResult => {
// 		const queryClient = useQueryClient();
// 		const boardListParamValue = useRecoilValue(boardListParamAtom);
//
// 		// 아래와 같이 selector의 getter를 사용하는 방법도 있음.
// 		// const boardListParamValueWithSelector = useRecoilValue(boardListParamSelector);
//
// 		return useQuery(
// 			boardKeys.list(),
// 			() => {
// 				// queryFn 내부에서는 recoil state 호출할 수 없음 (Invalid hook call 발생)
// 				console.log('useGetBoardListQueryWithRecoil > queryFn > boardListParamValue', boardListParamValue);
// 				return BoardService.getBoardList(boardListParamValue);
// 			},
// 			{
// 				enabled: false,
// 				onError: () => {
// 					// toast.error(mpProductToastType.getMpProduct.error);
// 				},
// 				onSuccess: (data) => {
// 					// setMpProductListState(data.data.content as MpProduct[]);
// 				}
// 			}
// 		)
// 	},
//
// 	useGetBoardDetailQueryWithRecoil: (): UseQueryResult => {
// 		const queryClient = useQueryClient();
// 		const boardDetailParamValue = useRecoilValue(boardDetailParamAtom);
//
// 		return useQuery(
// 			boardKeys.detail(),
// 			() => {
// 				return BoardService.getBoardDetail(boardDetailParamValue);
// 			},
// 			{
// 				enabled: false,
// 				onError: () => {
// 					// toast.error(mpProductToastType.getMpProduct.error);
// 				},
// 				onSuccess: (data) => {
// 					// setMpProductListState(data.data.content as MpProductDetail);
// 				}
// 			}
// 		)
// 	},
//
// 	useCreateBoardMutationWithRecoil: (): UseMutationResult => {
// 		const queryClient = useQueryClient();
// 		const createBoardParamValue = useRecoilValue(createBoardParamAtom);
// 		const resetCreateBoardParamState = useResetRecoilState(createBoardParamAtom);
//
// 		return useMutation(
// 			boardKeys.create(),
// 			() => {
// 				return BoardService.createBoard(createBoardParamValue);
// 			},
// 			{
// 				retry: 0,
// 				onMutate: (variables) => {
// 					// mutation 실행되기 전에 호출되는 함수.
// 					// mutationFn에 전달되는 파라미터를 동일하게 받음.
// 					// mutate({...param}) 호출시 사용한 파라미터를 variables로 받아서 사용 가능.
// 					// mutation 실패시 return문을 이용하여 onError, onSettled 함수에 값을 전달 가능.
// 					// onError, onSettled에서는 context로 받아서 사용.
// 					// mutation 실패시 롤백이 필요한 경우엔 여기에서 처리.
// 					// return { ...variables };
// 				},
// 				onError: (error, variables, context) => {
// 					// toast.error(mpProductToastType.createMpProduct.error);
// 				},
// 				onSuccess: (data, variables, context) => {
// 					// toast.success(mpProductToastType.createMpProduct.success);
// 					resetCreateBoardParamState();
// 					// mutation 성공시 관련 쿼리가 refetch 가능하도록 invalidate 처리.
// 					queryClient.invalidateQueries(boardKeys.create());
// 				},
// 				onSettled: (data, error, variables, context) => {
// 					// mutation 성공 또는 실패시 호출되는 함수
// 					// 성공/실패 여부와 상관없이 처리할 작업이 있다면 여기에 작성.
// 				},
// 			}
// 		)
// 	},
//
// 	useUpdateBoardMutationWithRecoil: (): UseMutationResult => {
// 		const queryClient = useQueryClient();
// 		const updateBoardParamValue = useRecoilValue(updateBoardParamAtom);
// 		const resetUpdateBoardParamState = useResetRecoilState(updateBoardParamAtom);
//
// 		return useMutation(
// 			boardKeys.update(),
// 			() => {
// 				return BoardService.updateBoard(updateBoardParamValue);
// 			},
// 			{
// 				retry: 0,
// 				onMutate: (variables) => {
// 				},
// 				onError: (error, variables, context) => {
// 				},
// 				onSuccess: (data, variables, context) => {
// 					resetUpdateBoardParamState();
// 					queryClient.invalidateQueries(boardKeys.update());
// 				},
// 				onSettled: (data, error, variables, context) => {
// 				},
// 			}
// 		)
// 	},
//
// 	useDeleteBoardMutationWithRecoil: (): UseMutationResult => {
// 		const queryClient = useQueryClient();
// 		const deleteBoardParamValue = useRecoilValue(deleteBoardParamAtom);
// 		const resetDeleteBoardParamState = useResetRecoilState(deleteBoardParamAtom);
//
// 		return useMutation(
// 			boardKeys.delete(),
// 			() => {
// 				return BoardService.deleteBoard(deleteBoardParamValue);
// 			},
// 			{
// 				retry: 0,
// 				onMutate: (variables) => {
// 				},
// 				onError: (error, variables, context) => {
// 				},
// 				onSuccess: (data, variables, context) => {
// 					resetDeleteBoardParamState();
// 					queryClient.invalidateQueries(boardKeys.delete());
// 				},
// 				onSettled: (data, error, variables, context) => {
// 				},
// 			}
// 		)
// 	},
//
// }
