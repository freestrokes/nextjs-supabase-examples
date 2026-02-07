export interface CommonState {
	lang: string;
	spinner: boolean;
	title: string;
	accessToken: string;
	updateLang: (lang: string) => void;
	updateSpinner: (isActive: boolean) => void;
	updateTitle: (title: string) => void;
	updateAccessToken: (accessToken: string) => void;
}