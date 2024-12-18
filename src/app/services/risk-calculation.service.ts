import { Injectable } from '@angular/core';
import {CalculationSetModel, ResultModel, ResultScenarioModel} from '../models/result.model';
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
	private applyMeasureToCalculationSet(calculationSet: CalculationSetModel): CalculationSetModel {
		calculationSet.measures.forEach(measure => {
			let idx = calculationSet.riskGroup.key - 1;
			let measure_group = measure.riskGroups[idx];

			calculationSet.effect.scenarioA.key += measure_group.scenarioARiskScores.effect;
			calculationSet.effect.scenarioB.key += measure_group.scenarioBRiskScores.effect;

			calculationSet.frequency.scenarioA.key += measure_group.scenarioARiskScores.frequency;
			calculationSet.frequency.scenarioB.key += measure_group.scenarioBRiskScores.frequency;

			calculationSet.probability.scenarioA.key += measure_group.scenarioARiskScores.probability;
			calculationSet.probability.scenarioB.key += measure_group.scenarioBRiskScores.probability;
		});

		return calculationSet;
	}

	public getRiskNumbers(calculationSetModels: CalculationSetModel[]): ResultModel | null {
		// Deep copy of the calculation model so that the measures' changes don't persist
		calculationSetModels = JSON.parse(JSON.stringify(calculationSetModels));

		let results: ResultModel = {
			scenarioAResults: { },
			scenarioBResults: { },
		};

		calculationSetModels.forEach(calculationSet => {
			calculationSet = this.applyMeasureToCalculationSet(calculationSet);

			let group: keyof ResultScenarioModel  = 'motorist';
			switch (calculationSet.riskGroup.key) {
				case 1:
					group = "motorist";
					break;
				case 2:
					group = "residents";
					break;
				case 3:
					group = "vkm"
					break;
				case 4:
					group = "roadWorker"
					break;
			}

			// Calculate values.
			results.scenarioAResults[group] = Math.max(Math.min((
				Math.floor((
					calculationSet.effect.scenarioA.key *
					calculationSet.probability.scenarioA.key *
					calculationSet.frequency.scenarioA.key) * 100) / 100
			), MAX_RISK_SCORE), 0);

			results.scenarioBResults[group] = Math.max(Math.min((
				Math.floor((
					calculationSet.effect.scenarioB.key *
					calculationSet.probability.scenarioB.key *
					calculationSet.frequency.scenarioB.key) * 100) / 100
			), MAX_RISK_SCORE), 0);
		});

		// Combine the results and include the advice.
		return {
			scenarioAResults: results.scenarioAResults,
			scenarioBResults: results.scenarioBResults,
			advice: this.adviceService.getAdvice(results)
		};
	}
}
