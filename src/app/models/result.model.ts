import {MeasureModel} from './measure.model';

export interface ResultModel {
	riskType: string,
	situationType: string,
	personType: string,
	probability: number,
	frequency: number,
	effect: number,
	measures: MeasureModel[]
}

export interface KeyValuePair {
	key: number,
	value: string
}
