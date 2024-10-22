
export interface EntryConfig {
	label: string,
	unit: string,
	required?: boolean,
	defaultValue?: number,
	min?: number,
	max?: number,
	placeholder?: string
	validationMessage?: string
}
