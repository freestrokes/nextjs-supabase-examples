import { User } from "@/types/User";

export interface UserState {
	user: User;
	updateUser: (user: User) => void;
}
