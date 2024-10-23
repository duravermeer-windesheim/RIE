
export interface EntryConfig {
	label: string,
	code: string,
	unit: string,
	required?: boolean,
	defaultValue?: number,
	min?: number,
	max?: number,
	step: number,
	disabled?: boolean
	placeholder?: string
	validationMessage?: string
}
