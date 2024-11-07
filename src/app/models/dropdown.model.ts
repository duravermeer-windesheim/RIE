export interface DropdownConfig {
	label: string,
	code: string,
	required?: boolean,
	validationMessage?: string,
	addDefaultEmptyOption?: boolean,
	defaultItems: DropdownItem[],
}

export interface DropdownItem {
	key: number,
	value: string,
	disabled?: boolean
}
