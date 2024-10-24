import {DropdownConfig} from '../models/dropdown.model';

export const dropdownConfigs: DropdownConfig[] = [
	{
		label: 'Type risico',
		code: 'riskType',
		required: true,
		addDefaultEmptyOption: true,
		items: [
			{
				key: '0',
				value: 'Aangereden op de vluchtstrook',
			},
			{
				key: '1',
				value: 'Schade bij omwoonende',
			},
		]
	},
	{
		label: 'Weggebruiker persoon ofzo',
		code: 'riskType',
		required: true,
		addDefaultEmptyOption: true,
		items: [
			{
				key: '0',
				value: 'Wegwerker 1',
			},
			{
				key: '1',
				value: 'Bordenman',
			},
			{
				key: '12',
				value: 'Weggebruiker',
			},
			{
				key: '13',
				value: 'Omwonende',
			},
		]
	},
	{
		label: 'Bereken voor situatie',
		code: 'situation',
		required: true,
		items: [
			{
				key: 'wa',
				value: 'Gedeeltelijk afsluiten',
			},
			{
				key: 'va',
				value: 'Vierkant afsluiten',
			},
		]
	}
]
