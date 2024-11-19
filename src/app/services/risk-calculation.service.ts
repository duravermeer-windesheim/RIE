import { Injectable } from '@angular/core';
import {CalculationModel, ResultModel} from '../models/result.model';
import {RiskScoreGroupCollectionModel} from '../models/risk.model';

@Injectable({
	providedIn: 'root'
})
export class RiskCalculationService {

	constructor() { }

	public getRiskNumbers(calculationModel: CalculationModel): ResultModel | null {
		// Deep copy of the calculation model so that the measures' changes don't persist
		calculationModel = JSON.parse(JSON.stringify(calculationModel));

		if (!calculationModel.riskType) {
			return null;
		}

		// Grab a variable for each of the riskGroups.
		let rou = calculationModel.riskType.riskGroups[2];
		let row = calculationModel.riskType.riskGroups[0];
		let vkm = calculationModel.riskType.riskGroups[1];
		let res = calculationModel.riskType.riskGroups[3];

		// For each of the present measures, change each of the base values.
		calculationModel.measures.forEach(measure => {
			let m_rou = measure.riskGroups[2];
			let m_row = measure.riskGroups[0];
			let m_vkm = measure.riskGroups[1];
			let m_res = measure.riskGroups[3];

			// A.
			row.situationARiskScores.frequency += m_row.situationARiskScores.frequency;
			row.situationARiskScores.effect += m_row.situationARiskScores.effect;
			row.situationARiskScores.probability += m_row.situationARiskScores.probability;

			rou.situationARiskScores.frequency += m_rou.situationARiskScores.frequency;
			rou.situationARiskScores.effect += m_rou.situationARiskScores.effect;
			rou.situationARiskScores.probability += m_rou.situationARiskScores.probability;

			vkm.situationARiskScores.frequency += m_vkm.situationARiskScores.frequency;
			vkm.situationARiskScores.effect += m_vkm.situationARiskScores.effect;
			vkm.situationARiskScores.probability += m_vkm.situationARiskScores.probability;

			res.situationARiskScores.frequency += m_res.situationARiskScores.frequency;
			res.situationARiskScores.effect += m_res.situationARiskScores.effect;
			res.situationARiskScores.probability += m_res.situationARiskScores.probability;

			// B.
			row.situationBRiskScores.frequency += m_row.situationBRiskScores.frequency;
			row.situationBRiskScores.effect += m_row.situationBRiskScores.effect;
			row.situationBRiskScores.probability += m_row.situationBRiskScores.probability;

			rou.situationBRiskScores.frequency += m_rou.situationBRiskScores.frequency;
			rou.situationBRiskScores.effect += m_rou.situationBRiskScores.effect;
			rou.situationBRiskScores.probability += m_rou.situationBRiskScores.probability;

			vkm.situationBRiskScores.frequency += m_vkm.situationBRiskScores.frequency;
			vkm.situationBRiskScores.effect += m_vkm.situationBRiskScores.effect;
			vkm.situationBRiskScores.probability += m_vkm.situationBRiskScores.probability;

			res.situationBRiskScores.frequency += m_res.situationBRiskScores.frequency;
			res.situationBRiskScores.effect += m_res.situationBRiskScores.effect;
			res.situationBRiskScores.probability += m_res.situationBRiskScores.probability;

		})

		let a_rou = rou.situationARiskScores.effect * rou.situationARiskScores.probability * rou.situationARiskScores.frequency;
		let a_row = row.situationARiskScores.effect * row.situationARiskScores.probability * row.situationARiskScores.frequency;
		let a_vkm = vkm.situationARiskScores.effect * vkm.situationARiskScores.probability * vkm.situationARiskScores.frequency;
		let a_res = res.situationARiskScores.effect * res.situationARiskScores.probability * res.situationARiskScores.frequency;

		let b_rou = rou.situationBRiskScores.effect * rou.situationBRiskScores.probability * rou.situationBRiskScores.frequency;
		let b_row = row.situationBRiskScores.effect * row.situationBRiskScores.probability * row.situationBRiskScores.frequency;
		let b_vkm = vkm.situationBRiskScores.effect * vkm.situationBRiskScores.probability * vkm.situationBRiskScores.frequency;
		let b_res = res.situationBRiskScores.effect * res.situationBRiskScores.probability * res.situationBRiskScores.frequency;

		return {
			scenarioAResults: {
				roadUser: a_rou,
				roadWorker: a_row,
				vkm: a_vkm,
				residents: a_res,
			},
			scenarioBResults: {
				roadUser: b_rou,
				roadWorker: b_row,
				vkm: b_vkm,
				residents: b_res,
			}
		}
	}

}
