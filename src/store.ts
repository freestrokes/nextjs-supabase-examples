// store.js
import { create } from "zustand";
import { User } from "@/types/User";

const useStore = create((set) => ({
	// 사용자 정보
	user: {
		name: "John Doe",
		email: "john.doe@example.com",
	} as User,
	// UI 상태
	modalOpen: false,
	
	updateUser: (newUser: any) =>
		set((state: any) => ({
			user: {
				...state.user,
				...newUser
			},
		})),

	toggleModal: () =>
		set((state: any) => ({
			modalOpen: !state.modalOpen,
		})),
}));

export default useStore;