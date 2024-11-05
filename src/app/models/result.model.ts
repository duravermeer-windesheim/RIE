import {KeyValuePair} from './keyvalue.model';

export interface ResultModel {
	riskType: string,
	situationType: string,
	personType: string,
	probability: number,
	frequency: number,
	effect: number,
	measures: KeyValuePair[]
}
