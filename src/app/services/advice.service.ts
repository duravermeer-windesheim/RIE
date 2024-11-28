import { Injectable } from '@angular/core';
import {ResultModel} from '../models/result.model';
import {AdviceModel} from '../models/advice.model';
import {environment} from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AdviceService {


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
		if (resultModel.scenarioAResults.motorist >= environment.advice.maximumForScenarioDecision ||
			resultModel.scenarioAResults.residents >= environment.advice.maximumForScenarioDecision ||
			resultModel.scenarioAResults.vkm >= environment.advice.maximumForScenarioDecision ||
			resultModel.scenarioAResults.roadWorker >= environment.advice.maximumForScenarioDecision
		) {
			isAnyOfAOverThreshold = true;
		}

		// Check whether any of B's groups is over the threshold.
		if (resultModel.scenarioBResults.motorist >= environment.advice.maximumForScenarioDecision ||
			resultModel.scenarioBResults.residents >= environment.advice.maximumForScenarioDecision ||
			resultModel.scenarioBResults.vkm >= environment.advice.maximumForScenarioDecision ||
			resultModel.scenarioBResults.roadWorker >= environment.advice.maximumForScenarioDecision
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
		if (resultModel.scenarioAResults.motorist >= environment.advice.maximumBeforeMeasureRecs ||
			resultModel.scenarioBResults.motorist >= environment.advice.maximumBeforeMeasureRecs
		) {
			advices.push(...environment.advice.measureRecs.motorist);
		}

		// RESIDENTS.
		if (resultModel.scenarioAResults.residents >= environment.advice.maximumBeforeMeasureRecs ||
			resultModel.scenarioBResults.residents >= environment.advice.maximumBeforeMeasureRecs
		) {
			advices.push(...environment.advice.measureRecs.residents);
		}

		// VKM.
		if (resultModel.scenarioAResults.vkm >= environment.advice.maximumBeforeMeasureRecs ||
			resultModel.scenarioBResults.vkm >= environment.advice.maximumBeforeMeasureRecs
		) {
			advices.push(...environment.advice.measureRecs.vkm);
		}

		// ROAD WORKERS.
		if (resultModel.scenarioAResults.roadWorker >= environment.advice.maximumBeforeMeasureRecs ||
			resultModel.scenarioBResults.roadWorker >= environment.advice.maximumBeforeMeasureRecs
		) {
			advices.push(...environment.advice.measureRecs.roadWorker);
		}

		return advices;
	}
}
