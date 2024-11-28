import { Injectable } from '@angular/core';
import {CalculationModel, ResultModel} from '../models/result.model';
import {RiskScoreGroupModel, RiskScoreModel} from '../models/risk.model';
import {DropdownItem} from '../models/dropdown.model';
import {AdviceService} from './advice.service';

export const MAX_RISK_SCORE = 400;

@Injectable({
	providedIn: 'root'
})
export class RiskCalculationService {

	constructor(private adviceService: AdviceService) { }

	// Applies measures to a new risk-group.
	private applyMeasuresToRiskGroup(calculationModel: CalculationModel, idx: number): RiskScoreGroupModel | undefined {
		let group = calculationModel.riskType?.riskGroups[idx];
		if (!group) {
			return;
		}

		calculationModel.measures.forEach(measure => {
			let measure_group = measure.riskGroups[idx];

			group.scenarioARiskScores.effect = measure_group.scenarioARiskScores.effect;
			group.scenarioARiskScores.probability = measure_group.scenarioARiskScores.probability;

			group.scenarioBRiskScores.effect = measure_group.scenarioBRiskScores.effect;
			group.scenarioBRiskScores.probability = measure_group.scenarioBRiskScores.probability;
		})

		return group;
	}

	// Calculates the value for a specific risk-group.
	private calculateRiskNumbersForGroup(calculationModel: CalculationModel,
		 group: RiskScoreGroupModel | undefined, scenario: 'a' | 'b'): number {

		if (!group) {
			return -1;
		}

		let scores!: RiskScoreModel;
		let frequency!: DropdownItem;

		if (scenario == 'a') {
			scores = group.scenarioARiskScores;
			frequency = calculationModel.frequencies.frequencyA;
		} else if (scenario == 'b') {
			scores = group.scenarioBRiskScores;
			frequency = calculationModel.frequencies.frequencyB;
		}

		let val = scores.effect * scores.probability * frequency.key;
		return Math.min(MAX_RISK_SCORE, Math.max(0, val));
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

		// Get the results.
		let results = {
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
		};

		// Combine the results and include the advice.
		return {
			scenarioAResults: results.scenarioAResults,
			scenarioBResults: results.scenarioBResults,
			advice: this.adviceService.getAdvice(results)
		};

	}
}
