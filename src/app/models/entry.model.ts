import {HelpModel} from './help.model';

export interface EntryConfig {
	label: string,
	code: string,
	help: HelpModel,
	required?: boolean,
	defaultValue?: number,
	min?: number,
	max?: number,
	step: number,
	disabled?: boolean
	placeholder?: string
	validationMessage?: string
}
