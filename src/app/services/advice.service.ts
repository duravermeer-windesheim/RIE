import { Injectable } from '@angular/core';
import {ResultModel} from '../models/result.model';
import {AdviceModel} from '../models/advice.model';

@Injectable({
	providedIn: 'root'
})
export class AdviceService {

	private readonly RISK_THRESHOLD = 70;
	private readonly SCENARIO_DECISION_THRESHOLD = 200;


	public getAdvice(resultModel: ResultModel): AdviceModel {
		let scenario = this.getScenario(resultModel);
		let measures = this.getMeasures(resultModel);

		return {
			advisedScenario: scenario,
			advisedMeasures: measures
		}
	}

	private getScenario(resultModel: ResultModel): "a" | "b" | "even" {

		let isAnyOfAOverThreshold = false;
		let isAnyOfBOverThreshold = false;

		// Check whether any of A's groups is over the threshold.
		if (resultModel.scenarioAResults.motorist >= this.SCENARIO_DECISION_THRESHOLD ||
			resultModel.scenarioAResults.residents >= this.SCENARIO_DECISION_THRESHOLD ||
			resultModel.scenarioAResults.vkm >= this.SCENARIO_DECISION_THRESHOLD ||
			resultModel.scenarioAResults.roadWorker >= this.SCENARIO_DECISION_THRESHOLD
		) {
			isAnyOfAOverThreshold = true;
		}

		// Check whether any of B's groups is over the threshold.
		if (resultModel.scenarioBResults.motorist >= this.SCENARIO_DECISION_THRESHOLD ||
			resultModel.scenarioBResults.residents >= this.SCENARIO_DECISION_THRESHOLD ||
			resultModel.scenarioBResults.vkm >= this.SCENARIO_DECISION_THRESHOLD ||
			resultModel.scenarioBResults.roadWorker >= this.SCENARIO_DECISION_THRESHOLD
		) {
			isAnyOfBOverThreshold = true;
		}

		// If any of b is over the threshold, and none of a, choose b. And reverse.
		if (isAnyOfAOverThreshold && !isAnyOfBOverThreshold) {
			return "b";
		} else if (isAnyOfBOverThreshold && !isAnyOfAOverThreshold) {
			return "a";
		}

		// Check the total scores of both a and b.
		let totalOfScenarioA = resultModel.scenarioAResults.motorist + resultModel.scenarioAResults.residents +
			resultModel.scenarioAResults.vkm + resultModel.scenarioAResults.roadWorker;

		let totalOfScenarioB = resultModel.scenarioBResults.motorist + resultModel.scenarioBResults.residents +
			resultModel.scenarioBResults.vkm + resultModel.scenarioBResults.roadWorker;

		// If both are even, do that.
		if (totalOfScenarioA == totalOfScenarioB) {
			return 'even';
		}

		// If neither are above the threshold, choose the one with the lower total score.
		return totalOfScenarioA > totalOfScenarioB ? 'b' : 'a';
	}

	private getMeasures(resultModel: ResultModel): string[] {
		let advices = [];

		// MOTORIST.
		if (resultModel.scenarioAResults.motorist >= this.RISK_THRESHOLD ||
			resultModel.scenarioBResults.motorist >= this.RISK_THRESHOLD
		) {
			advices.push("Snelheid verlagen", "Flitscamera’s plaatsen");
		}

		// RESIDENTS.
		if (resultModel.scenarioAResults.residents >= this.RISK_THRESHOLD ||
			resultModel.scenarioBResults.residents >= this.RISK_THRESHOLD
		) {
			advices.push("Drempels plaatsen");
		}

		// VKM.
		if (resultModel.scenarioAResults.vkm >= this.RISK_THRESHOLD ||
			resultModel.scenarioBResults.vkm >= this.RISK_THRESHOLD
		) {
			advices.push("Snelheid verlagen");
		}

		// ROAD WORKERS.
		if (resultModel.scenarioAResults.roadWorker >= this.RISK_THRESHOLD ||
			resultModel.scenarioBResults.roadWorker >= this.RISK_THRESHOLD
		) {
			advices.push("Ingang werkvak bij oprit");
		}

		return advices;
	}
}
