import {EntryConfig} from '../models/entry.model';

export const entryConfigs: { [key: string]: EntryConfig } = {
	effect: {
		label: 'Effect',
		code: 'effect',
		help: {
			code: 'help_effect',
			title: 'Effect',
			description: 'De factor Ernst of Effect E, geeft een aanduiding van de mogelijke schade en de gevolgen ' +
				'wanneer het riscico zich voordoet. De schaal gaan van 1 tot 100.\n' +
				'Bekijk fine-kinney voor meer informatie',
		},
		min: 0,
		max: 40,
		step: 1,
		placeholder: 'Een nummer tussen 0 en 40',
		validationMessage: 'Effect moet tussen 0 en 40 zijn'
	},
	frequency: {
		label: 'Blootstelling',
		code: 'frequency',
		help: {
			code: 'help_frequency',
			title: 'Blootstelling',
			description: 'De blootstellingsfactor B geeft een idee van de blootstellingsduur aan het risico. ' +
				'De waardeschaal van de blootstelling gaat van 0,5 tot 10,\n' +
				'Bekijk fine-kinney voor meer informatie',
		},
		min: 0.5,
		max: 10,
		step: 0.5,
		placeholder: 'Een nummer tussen 0.5 en 10',
		validationMessage: 'Blootstelling moet tussen 0.5 en 10 zijn'
	},
	probability: {
		label: 'Waarschijnlijkheid',
		code: 'probability',
		help: {
			code: 'help_probability',
			title: 'Waarschijnlijkheid',
			description: 'De waarschijnlijkheidsfactor W of de (wiskundige) kans dat een incident zich voordoet. ' +
				'De factor geeft de verwachting weer en krijgt een referentiecijfer van 0.1 tot 10 toegekend.\n' +
				'Bekijk fine-kinney voor meer informatie',

		},
		min: 0,
		max: 10,
		step: 1,
		placeholder: 'Een nummer tussen 0 en 10',
		validationMessage: 'Waarschijnlijkheid moet tussen 0 en 10 zijn'
	},
}
