import {DropdownConfig} from '../models/dropdown.model';

export const dropdownConfigs: { [key: string]: DropdownConfig } = {
	"riskType": {
		label: 'Type risico',
		code: 'riskType',
		required: true,
		addDefaultEmptyOption: false,
		defaultItems: [
			{
				key: 0,
				value: 'Aangereden op de vluchtstrook',
			},
			{
				key: 1,
				value: 'Schade bij omwoonende',
			},
		]
	},
	"personType": {
		label: 'Weggebruiker type',
		code: 'personType',
		required: true,
		addDefaultEmptyOption: false,
		defaultItems: [
			{
				key: 10,
				value: 'Wegwerker',
			},
			{
				key: 11,
				value: 'Bordenman',
			},
			{
				key: 12,
				value: 'Weggebruiker',
			},
			{
				key: 13,
				value: 'Omwonende',
			},
		]
	},
	"situationType": {
		label: 'Bereken voor situatie',
		code: 'situationType',
		required: true,
		defaultItems: [
			{
				key: 2,
				value: 'Gedeeltelijk afsluiten',
			},
			{
				key: 1,
				value: 'Vierkant afsluiten',
			},
		]
	},
	"measure": {
		label: 'Maatregel',
		code: 'measure',
		defaultItems: [
			{
				key: 1,
				value: 'Snelheid verlagen',
			},
			{
				key: 2,
				value: 'Flitscamera\'s',
			},
			{
				key: 3,
				value: 'Wegversmalling',
			},
		]
	}
}


