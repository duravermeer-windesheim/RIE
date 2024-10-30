import {MeasureConfig, MeasureTargetType} from '../models/measure.config';

export const measuresConfig: MeasureConfig[] = [
	{
		key: 1,
		label: 'Snelheid verlagen',
		targets: [
			{
				type: MeasureTargetType.Effect,
				effect: -7
			},
			{
				type: MeasureTargetType.Frequency,
				effect: 3,
			},
			{
				type: MeasureTargetType.Probability,
				effect: -12,
			}
		]
	},
	{
		key: 2,
		label: 'Flitscamera\'s',
		targets: [
			{
				type: MeasureTargetType.Effect,
				effect: 19
			},
		]
	},
	{
		key: 3,
		label: 'Wegversmalling',
		targets: [
			{
				type: MeasureTargetType.Probability,
				effect: -5
			},
			{
				type: MeasureTargetType.Frequency,
				effect: 2
			}
		]
	},

]
