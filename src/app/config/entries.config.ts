import {DropdownConfig} from '../models/dropdown.model';
import {EntryConfig} from '../models/entry.model';

export const entryConfigs: { [key: string]: EntryConfig } = {
	"probability": {
		label: 'Waarschijnlijkheid',
		code: 'probability',
		help: {
			code: 'help_probability',
			title: 'Waarschijnlijkheid hulp',
			description: 'blabla',
		},
		required: true,
		min: 0,
		max: 10,
		defaultValue: 7,
		step: 1,
		placeholder: 'Een nummer tussen 0 en 10',
		validationMessage: 'Waarschijnlijkheid moet tussen 0 en 10 zijn'
	},
	"frequency": {
		label: 'Blootstelling',
		code: 'frequency',
		help: {
			code: 'help_frequency',
			title: 'Blootstelling hulp',
			description: 'blabla',
		},
		required: true,
		min: 0.5,
		max: 10,
		defaultValue: 1,
		step: 0.5,
		placeholder: 'Een nummer tussen 0.5 en 10',
		validationMessage: 'Blootstelling moet tussen 0.5 en 10 zijn'
	},
	"effect": {
		label: 'Effect',
		code: 'effect',
		help: {
			code: 'help_effect',
			title: 'Effect hulp',
			description: 'blabla',
		},
		required: true,
		min: 0,
		max: 40,
		defaultValue: 38,
		step: 1,
		placeholder: 'Een nummer tussen 0 en 40',
		validationMessage: 'Effect moet tussen 0 en 40 zijn'
	},
}
