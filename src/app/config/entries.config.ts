import {DropdownConfig} from '../models/dropdown.model';
import {EntryConfig} from '../models/entry.model';

export const entryConfigs: EntryConfig[] = [
	{
		label: 'Waarschijnlijkheid',
		code: 'probability',
		unit: '?',
		required: true,
		min: 0,
		max: 10,
		defaultValue: 7,
		step: 1,
		placeholder: 'Een nummer tussen 0 en 10',
		validationMessage: 'Waarschijnlijkheid moet tussen 0 en 10 zijn'
	},
	{
		label: 'Blootstelling',
		code: 'frequency',
		unit: '?',
		required: true,
		min: 0.5,
		max: 10,
		defaultValue: 1,
		step: 0.5,
		placeholder: 'Een nummer tussen 0.5 en 10',
		validationMessage: 'Blootstelling moet tussen 0.5 en 10 zijn'
	},
	{
		label: 'Effect',
		code: 'effect',
		unit: '?',
		required: true,
		min: 0,
		max: 40,
		defaultValue: 38,
		step: 1,
		placeholder: 'Een nummer tussen 0 en 40',
		validationMessage: 'Effect moet tussen 0 en 40 zijn'
	},
]
