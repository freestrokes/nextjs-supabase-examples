import { create } from 'zustand'
import { ExtractState, StoreApi } from 'zustand/index';
import { TestState } from '@/states/TestState';

const useTestStore = create<TestState>()((set) => ({
	bears: 0,
	increasePopulation: () =>
		set((testState: any) => ({
			bears: testState.bears + 1
		})),
	removeAllBears: () =>
		set({
			bears: 0
		}),
	updateBears: (newBears: number) =>
		set({
			bears: newBears
		}),
}))

export const getTestState = () => useTestStore.getState;
export const useTestState = () => useTestStore((store: ExtractState<StoreApi<TestState>>) => store.bears);
export const useTestIncreasePopulation = () => useTestStore((store: ExtractState<StoreApi<TestState>>) => store.increasePopulation);
export const useTestRemoveAllBears = () => useTestStore((store: ExtractState<StoreApi<TestState>>) => store.removeAllBears);
export const useTestUpdateBears = () => useTestStore((store: ExtractState<StoreApi<TestState>>) => store.updateBears);
