import {defaultDropdownItem, DropdownConfig, DropdownItem} from '../models/dropdown.model';

const frequencyDropdownItems: DropdownItem[] = [
	defaultDropdownItem,
	{ key: 0.5, value: '0.5 | Zeer zelden' },
	{ key: 1, value: '1 | Zelden (<1% van tijdsduur evenement)' },
	{ key: 2, value: '2 | Soms, ongewoon (>1%, <10% van de tijdsduur evenement)' },
	{ key: 3, value: '3 | Af en toe, occasioneel (>10%, <50% van tijdsduur evenement)' },
	{ key: 6, value: '6 | Regelmatig, frequent (>50%, <90% van tijdsduur evenement)' },
	{ key: 10, value: '10 | Voortdurend, (>90% van tijdsduur evenement)' },
];

const probabilityDropdownItems: DropdownItem[] = [
	defaultDropdownItem,
	{ key: 0.5, value: '0.5 | Zeer zelden' },
	{ key: 1, value: '1 | Zelden (<1% van tijdsduur evenement)' },
	{ key: 2, value: '2 | Soms, ongewoon (>1%, <10% van de tijdsduur evenement)' },
	{ key: 3, value: '3 | Af en toe, occasioneel (>10%, <50% van tijdsduur evenement)' },
	{ key: 6, value: '6 | Regelmatig, frequent (>50%, <90% van tijdsduur evenement)' },
	{ key: 10, value: '10 | Voortdurend, (>90% van tijdsduur evenement)' },
];

const effectDropdownItems: DropdownItem[] = [
	defaultDropdownItem,
	{ key: 0.5, value: '0.5 | Zeer zelden' },
	{ key: 1, value: '1 | Zelden (<1% van tijdsduur evenement)' },
	{ key: 2, value: '2 | Soms, ongewoon (>1%, <10% van de tijdsduur evenement)' },
	{ key: 3, value: '3 | Af en toe, occasioneel (>10%, <50% van tijdsduur evenement)' },
	{ key: 6, value: '6 | Regelmatig, frequent (>50%, <90% van tijdsduur evenement)' },
	{ key: 10, value: '10 | Voortdurend, (>90% van tijdsduur evenement)' },
];

const riskGroupDropdownItems: DropdownItem[] = [
	defaultDropdownItem,
	{ key: 1, value: 'Auto mobilist' },
	{ key: 2, value: 'Omwonende' },
	{ key: 3, value: 'VKM ploeg' },
	{ key: 4, value: 'Wegwerker' },
];


export const dropdownConfigs: { [key: string]: DropdownConfig } = {
	riskGroup: {
		label: 'Risico Groep',
		code: 'riskGroup',
		required: true,
		addDefaultEmptyOption: true,
		defaultItems: riskGroupDropdownItems
	},
	measure: {
		label: 'Maatregel',
		code: 'measure',
		addDefaultEmptyOption: true,
		defaultItems: [],
	},
	freqA: {
		label: 'Blootstelling scenario Langs werkvak',
		code: 'freq_a',
		required: true,
		defaultItems: effectDropdownItems
	},
	freqB: {
		label: 'Blootstelling scenario Verkeer omleiden',
		code: 'freq_b',
		required: true,
		defaultItems: effectDropdownItems
	},
	effectA: {
		label: 'Effect scenario Langs werkvak',
		code: 'effect_a',
		required: true,
		defaultItems: effectDropdownItems
	},
	effectB: {
		label: 'Effect scenario Verkeer omleiden',
		code: 'effect_b',
		required: true,
		defaultItems: effectDropdownItems
	},
	probabilityA: {
		label: 'Waarschijnlijkheid scenario Langs werkvak',
		code: 'effect_a',
		required: true,
		defaultItems: probabilityDropdownItems
	},
	probabilityB: {
		label: 'Waarschijnlijkheid scenario Verkeer omleiden',
		code: 'effect_b',
		required: true,
		defaultItems: probabilityDropdownItems
	},
}


