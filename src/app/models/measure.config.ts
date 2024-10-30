
export enum MeasureTargetType {
	Probability = 'probability',
	Frequency = 'frequency',
	Effect = 'effect'
}

export interface MeasureConfig {
	key: number,
	label: string,
	targets: {
		type: MeasureTargetType,
		effect: number
	}[]
}
