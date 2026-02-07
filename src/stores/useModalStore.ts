import { create } from "zustand";
import { ModalState } from "@/states/ModalState";

const useModalStore = create<ModalState>()((set) => ({
	modalOpen: false,
	toggleModal: () =>
		set((state: ModalState) => ({
			modalOpen: !state.modalOpen,
		})),
}));

export default useModalStore;