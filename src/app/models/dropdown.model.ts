export interface DropdownConfig {
	code: string,
	label: string,
	required?: boolean,
	validationMessage?: string,
	addDefaultEmptyOption?: boolean,
}

export interface DropdownItem {
	key: number,
	value: string,
	disabled?: boolean
}

export const defaultDropdownItem: DropdownItem = {
	key: -1,
	value: 'Selecteer een optie...',
	disabled: true,
}
