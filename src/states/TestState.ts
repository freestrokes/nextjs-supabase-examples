
export interface TestState {
	bears: number;
	increasePopulation: () => void;
	removeAllBears: () => void;
	updateBears: (newBears: number) => void;
}
