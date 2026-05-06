import { create, ExtractState, StoreApi } from "zustand";
import { User } from "@/types/User";
import { User } from "@/types/User";

export interface UserState {
        user: User;
        updateUser: (user: User) => void;
}

// 두번째 파라미터로 get 사용하는 방법 확인 필요.
const useUserStore = create<UserState>()((set) => ({
	user: {} as User,
	updateUser: (user: User) =>
		set((state: UserState) => ({
			user: { ...state.user, ...user },
		})),
}));

export const getUserState = () => useUserStore.getState;
export const useUserState = () => useUserStore((store: ExtractState<StoreApi<UserState>>) => store.user);
export const useUserUpdateUser = () => useUserStore((store: ExtractState<StoreApi<UserState>>) => store.updateUser);
