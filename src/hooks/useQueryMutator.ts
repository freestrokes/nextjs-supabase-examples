import { AxiosError } from 'axios';
import {
  QueryClient,
	useMutation,
	UseMutationOptions,
	UseMutationResult,
} from '@tanstack/react-query';

export default function useQueryMutator<TData = any, TVariables = any, TContext = any>(
	options: UseMutationOptions<TData, AxiosError, TVariables, TContext>,
	queryClient?: QueryClient,
): UseMutationResult<TData, AxiosError, TVariables, TContext> {
	return useMutation(
		options,
		queryClient
	);
};
