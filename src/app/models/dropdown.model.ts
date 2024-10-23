export interface DropdownConfig {
	label: string,
	required?: boolean,
	validationMessage?: string,
	addDefaultEmptyOption?: boolean,
	items: DropdownItem[],
}

export interface DropdownItem {
	key: string,
	value: string,
	selected?: boolean,
	disabled?: boolean
}
