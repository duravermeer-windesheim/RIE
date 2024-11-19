import {HelpModel} from './help.model';

export interface EntryConfig {
	label: string,
	code: string,
	help: HelpModel,
	min?: number,
	max?: number,
	step: number,
	placeholder?: string
	validationMessage?: string
}
