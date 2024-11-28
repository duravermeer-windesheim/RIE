import { Injectable } from '@angular/core';
import {CalculationModel, ResultModel} from '../models/result.model';
import {RiskScoreGroupModel, RiskScoreModel} from '../models/risk.model';
import {DropdownItem} from '../models/dropdown.model';

export const MAX_RISK_SCORE = 400;

@Injectable({
	providedIn: 'root'
})
export class RiskCalculationService {

	constructor() { }

	// Applies measures to a new riskgroup.
	private applyMeasuresToRiskGroup(calculationModel: CalculationModel, idx: number): RiskScoreGroupModel | undefined {
		let group = calculationModel.riskType?.riskGroups[idx];
		if (!group) {
			return;
		}

		calculationModel.measures.forEach(measure => {
			let measure_group = measure.riskGroups[idx];

			group.situationARiskScores.effect = measure_group.situationARiskScores.effect;
			group.situationARiskScores.probability = measure_group.situationARiskScores.probability;

			group.situationBRiskScores.effect = measure_group.situationBRiskScores.effect;
			group.situationBRiskScores.probability = measure_group.situationBRiskScores.probability;
		})

		return group;
	}

	// Calculates the value for a specific risk group.
	private calculateRiskNumbersForGroup(calculationModel: CalculationModel,
		 group: RiskScoreGroupModel | undefined, scenario: 'a' | 'b'): number {

		if (!group) {
			return -1;
		}

		let scores!: RiskScoreModel;
		let frequency!: DropdownItem;

		if (scenario == 'a') {
			scores = group.situationARiskScores;
			frequency = calculationModel.frequencies.frequencyA;
		} else if (scenario == 'b') {
			scores = group.situationBRiskScores;
			frequency = calculationModel.frequencies.frequencyB;
		}

		let val = scores.effect * scores.probability * frequency.key;
		return val >= MAX_RISK_SCORE ? MAX_RISK_SCORE : val;
	}


	public getRiskNumbers(calculationModel: CalculationModel): ResultModel | null {
		// Deep copy of the calculation model so that the measures' changes don't persist
		calculationModel = JSON.parse(JSON.stringify(calculationModel));

		if (!calculationModel.riskType) {
			return null;
		}

		// Grab the groups and apply measures to them.
		let mot = this.applyMeasuresToRiskGroup(calculationModel, 0);
		let res = this.applyMeasuresToRiskGroup(calculationModel, 1);
		let vkm = this.applyMeasuresToRiskGroup(calculationModel, 2);
		let row = this.applyMeasuresToRiskGroup(calculationModel, 3);

		return {
			scenarioAResults: {
				motorist: this.calculateRiskNumbersForGroup(calculationModel, mot, 'a'),
				residents: this.calculateRiskNumbersForGroup(calculationModel, res, 'a'),
				vkm: this.calculateRiskNumbersForGroup(calculationModel, vkm, 'a'),
				roadWorker: this.calculateRiskNumbersForGroup(calculationModel, row, 'a'),
			},
			scenarioBResults: {
				motorist: this.calculateRiskNumbersForGroup(calculationModel, mot, 'b'),
				residents: this.calculateRiskNumbersForGroup(calculationModel, res, 'b'),
				vkm: this.calculateRiskNumbersForGroup(calculationModel, vkm, 'b'),
				roadWorker: this.calculateRiskNumbersForGroup(calculationModel, row, 'b'),
			}
		}
	}
}
