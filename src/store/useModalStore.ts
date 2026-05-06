import { create } from "zustand";
export interface ModalState {
        modalOpen: boolean;
        toggleModal: () => void;
};

const useModalStore = create<ModalState>()((set) => ({
	modalOpen: false,
	toggleModal: () =>
		set((state: ModalState) => ({
			modalOpen: !state.modalOpen,
		})),
}));

export default useModalStore;