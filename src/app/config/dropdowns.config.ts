import {DropdownConfig} from '../models/dropdown.model';

export const dropdownConfigs: { [key: string]: DropdownConfig } = {
	riskType: {
		label: 'Type risico',
		code: 'riskType',
		required: true,
		addDefaultEmptyOption: true,
	},
	measure: {
		label: 'Maatregel',
		code: 'measure',
		addDefaultEmptyOption: true,
	},
	frequencyA: {
		label: 'Blootstelling scenario Langs werkvak',
		code: 'freq_a',
	},
	frequencyB: {
		label: 'Blootstelling scenario Verkeer omleiden',
		code: 'freq_b',
	}
}


