import { create, ExtractState, StoreApi } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CommonState } from '@/states/CommonState';

export const useCommonStore = create(
	persist<CommonState>(
		(set, get) => ({
			lang: 'ko',
			spinner: false,
			title: '',
			accessToken: '',
			updateLang: (lang: string) =>
				set((state: CommonState) => ({
					lang: state.lang !== lang ? lang : state.lang
				})),
			updateSpinner: (isActive: boolean) =>
				set((state: CommonState) => ({
					spinner: isActive
				})),
			updateTitle: (title: string) =>
				set((state: CommonState) => ({
					title: title
				})),
			updateAccessToken: (accessToken: string) =>
				set((state: CommonState) => ({
					accessToken: accessToken
				})),
		}),
		{
			name: 'common-storage', // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage)  // (optional) by default, 'localStorage' is used
		}
	)
);

export const getCommonState = () => useCommonStore.getState;
export const useCommonState = () => useCommonStore((store: ExtractState<StoreApi<CommonState>>) => store);
export const useCommonLangValue = () => useCommonStore((store: ExtractState<StoreApi<CommonState>>) => store.lang);
export const useCommonSpinnerValue = () => useCommonStore((store: ExtractState<StoreApi<CommonState>>) => store.spinner);
export const useCommonTitleValue = () => useCommonStore((store: ExtractState<StoreApi<CommonState>>) => store.title);
export const useCommonAccessTokenValue = () => useCommonStore((store: ExtractState<StoreApi<CommonState>>) => store.accessToken);
export const useCommonUpdateLang = () => useCommonStore((store: ExtractState<StoreApi<CommonState>>) => store.updateLang);
export const useCommonUpdateSpinner = () => useCommonStore((store: ExtractState<StoreApi<CommonState>>) => store.updateSpinner);
export const useCommonUpdateTitle = () => useCommonStore((store: ExtractState<StoreApi<CommonState>>) => store.updateTitle);
export const useCommonUpdateAccessToken = () => useCommonStore((store: ExtractState<StoreApi<CommonState>>) => store.updateAccessToken);

// export default useCommonStore;
