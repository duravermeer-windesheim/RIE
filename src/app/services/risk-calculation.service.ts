import { Injectable } from '@angular/core';
import {CalculationModel, ResultModel} from '../models/result.model';

export const MAX_RISK_SCORE = 400;

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
		let rou = calculationModel.riskType.riskGroups[0];
		let res = calculationModel.riskType.riskGroups[1];
		let vkm = calculationModel.riskType.riskGroups[2];
		let row = calculationModel.riskType.riskGroups[3];

		// For each of the present measures, change each of the base values.
		calculationModel.measures.forEach(measure => {
			let m_rou = measure.riskGroups[0];
			let m_res = measure.riskGroups[1];
			let m_vkm = measure.riskGroups[2];
			let m_row = measure.riskGroups[3];

			// A.
			row.situationARiskScores.effect += m_row.situationARiskScores.effect;
			row.situationARiskScores.probability += m_row.situationARiskScores.probability;

			rou.situationARiskScores.effect += m_rou.situationARiskScores.effect;
			rou.situationARiskScores.probability += m_rou.situationARiskScores.probability;

			vkm.situationARiskScores.effect += m_vkm.situationARiskScores.effect;
			vkm.situationARiskScores.probability += m_vkm.situationARiskScores.probability;

			res.situationARiskScores.effect += m_res.situationARiskScores.effect;
			res.situationARiskScores.probability += m_res.situationARiskScores.probability;

			// B.
			row.situationBRiskScores.effect += m_row.situationBRiskScores.effect;
			row.situationBRiskScores.probability += m_row.situationBRiskScores.probability;

			rou.situationBRiskScores.effect += m_rou.situationBRiskScores.effect;
			rou.situationBRiskScores.probability += m_rou.situationBRiskScores.probability;

			vkm.situationBRiskScores.effect += m_vkm.situationBRiskScores.effect;
			vkm.situationBRiskScores.probability += m_vkm.situationBRiskScores.probability;

			res.situationBRiskScores.effect += m_res.situationBRiskScores.effect;
			res.situationBRiskScores.probability += m_res.situationBRiskScores.probability;

		})

		let a_rou = rou.situationARiskScores.effect * rou.situationARiskScores.probability * calculationModel.frequencies.frequencyA.key;
		let a_row = row.situationARiskScores.effect * row.situationARiskScores.probability * calculationModel.frequencies.frequencyA.key;
		let a_vkm = vkm.situationARiskScores.effect * vkm.situationARiskScores.probability * calculationModel.frequencies.frequencyA.key;
		let a_res = res.situationARiskScores.effect * res.situationARiskScores.probability * calculationModel.frequencies.frequencyA.key;

		let b_rou = rou.situationBRiskScores.effect * rou.situationBRiskScores.probability * calculationModel.frequencies.frequencyB.key;
		let b_row = row.situationBRiskScores.effect * row.situationBRiskScores.probability * calculationModel.frequencies.frequencyB.key;
		let b_vkm = vkm.situationBRiskScores.effect * vkm.situationBRiskScores.probability * calculationModel.frequencies.frequencyB.key;
		let b_res = res.situationBRiskScores.effect * res.situationBRiskScores.probability * calculationModel.frequencies.frequencyB.key;

		return {
			scenarioAResults: {
				roadUser: a_rou >= MAX_RISK_SCORE ? MAX_RISK_SCORE : a_rou,
				residents: a_res >= MAX_RISK_SCORE ? MAX_RISK_SCORE : a_res,
				vkm: a_vkm >= MAX_RISK_SCORE ? MAX_RISK_SCORE : a_vkm,
				roadWorker: a_row >= MAX_RISK_SCORE ? MAX_RISK_SCORE : a_row,
			},
			scenarioBResults: {
				roadUser: b_rou >= MAX_RISK_SCORE ? MAX_RISK_SCORE : b_rou,
				residents: b_res >= MAX_RISK_SCORE ? MAX_RISK_SCORE : b_res,
				vkm: b_vkm >= MAX_RISK_SCORE ? MAX_RISK_SCORE : b_vkm,
				roadWorker: b_row >= MAX_RISK_SCORE ? MAX_RISK_SCORE : b_row,
			}
		}
	}
}
