import {defaultDropdownItem, DropdownConfig, DropdownItem} from '../models/dropdown.model';

const frequencyDropdownItems: DropdownItem[] = [
	defaultDropdownItem,
	{ key: 0.5, value: '0.5 | Zeer zelden (minder dan 1 keer per jaar)' },
	{ key: 1, value: '1 | Zelden (jaarlijks)' },
	{ key: 2, value: '2 | Soms (maandelijks)' },
	{ key: 3, value: '3 | Af en toe (wekelijks)' },
	{ key: 6, value: '6 | Regelmatig (dagelijks)' },
	{ key: 10, value: '10 | Voortdurend' },
];

const probabilityDropdownItems: DropdownItem[] = [
	defaultDropdownItem,
	{ key: 0.1, value: '0.1 | Bijna niet denkbaar (nooit van gehoord)' },
	{ key: 0.2, value: '0.2 | Praktisch onmogelijk (nooit van gehoord binnen bedrijfstak en branche)' },
	{ key: 0.5, value: '0.5 | Denkbaar, maar onwaarschijnlijk (wel van gehoord binnen bedrijfstak en branche, maar niet binnen het bedrijf zelf)' },
	{ key: 1, value: '1 | Onwaarschijnlijk, maar mogelijk in grensgeval (in laatste 10 jaar niet binnen het bedrijf voorgekomen)' },
	{ key: 3, value: '3 | Ongewoon (in de laatste jaren binnen het bedrijf wel eens gebeurd)' },
	{ key: 6, value: '6 | Zeer wel mogelijk (enkele keren per jaar binnen het bedrijf gebeurd)' },
	{ key: 10, value: '10 | Te verwachten (komt vaak/vaker voor binnen het bedrijf)' },
];

const effectDropdownItems: DropdownItem[] = [
	defaultDropdownItem,
	{ key: 1, value: '1 | Alleen materiële schade' },
	{ key: 3, value: '3 | Lichtgewonden' },
	{ key: 7, value: '7 | Zwaargewonden' },
	{ key: 15, value: '15 | Eén dode' },
	{ key: 40, value: '40 | Meerdere doden' },
];

// Due to some bad structuring, the keys need to match the indexes here
const riskGroupDropdownItems: DropdownItem[] = [
	defaultDropdownItem,
	{ key: 1, value: 'Automobilist' },
	{ key: 2, value: 'Omwonende' },
	{ key: 3, value: 'VKM-ploeg' },
	{ key: 4, value: 'Wegwerker' },
];


export const dropdownConfigs: { [key: string]: DropdownConfig } = {
	riskGroup: {
		label: 'Risicogroep',
		code: 'riskGroup',
		required: true,
		defaultItems: riskGroupDropdownItems
	},
	measure: {
		label: 'Optioneel: Maatregel',
		code: 'measure',
		addDefaultEmptyOption: true,
		defaultItems: [],
	},
	freqA: {
		label: 'Verkeer omleiden',
		code: 'freq_a',
		required: true,
		defaultItems: frequencyDropdownItems
	},
	freqB: {
		label: 'Langs werkvak',
		code: 'freq_b',
		required: true,
		defaultItems: frequencyDropdownItems
	},
	effectA: {
		label: 'Verkeer omleiden',
		code: 'effect_a',
		required: true,
		defaultItems: effectDropdownItems
	},
	effectB: {
		label: 'Langs werkvak',
		code: 'effect_b',
		required: true,
		defaultItems: effectDropdownItems
	},
	probabilityA: {
		label: 'Verkeer omleiden',
		code: 'effect_a',
		required: true,
		defaultItems: probabilityDropdownItems
	},
	probabilityB: {
		label: 'Langs werkvak',
		code: 'effect_b',
		required: true,
		defaultItems: probabilityDropdownItems
	},
}


