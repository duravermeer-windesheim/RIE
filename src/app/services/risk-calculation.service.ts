import { Injectable } from '@angular/core';
import {CalculationModel, ResultModel} from '../models/result.model';

@Injectable({
	providedIn: 'root'
})
export class RiskCalculationService {

	constructor() { }

	public getRiskNumbers(calculationModel: CalculationModel): ResultModel {
		let number =
			calculationModel.riskScoreValues.effect +
			calculationModel.riskScoreValues.frequency +
			calculationModel.riskScoreValues.probability +
			calculationModel.measures.length;

		return {
			scenarioAResults: {
				roadUser: number,
				roadWorker: number,
				vkm: number,
				residents: number
			},
			scenarioBResults: {
				roadUser: number,
				roadWorker: number,
				vkm: number,
				residents: number
			}
		}
	}

}
