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
		if ((resultModel.scenarioAResults?.motorist ?? 0) >= environment.advice.maximumForScenarioDecision ||
			(resultModel.scenarioAResults?.residents ?? 0) >= environment.advice.maximumForScenarioDecision ||
			(resultModel.scenarioAResults?.vkm ?? 0) >= environment.advice.maximumForScenarioDecision ||
			(resultModel.scenarioAResults?.roadWorker ?? 0) >= environment.advice.maximumForScenarioDecision
		) {
			isAnyOfAOverThreshold = true;
		}

		// Check whether any of B's groups is over the threshold.
		if ((resultModel.scenarioBResults?.motorist ?? 0) >= environment.advice.maximumForScenarioDecision ||
			(resultModel.scenarioBResults?.residents ?? 0) >= environment.advice.maximumForScenarioDecision ||
			(resultModel.scenarioBResults?.vkm ?? 0) >= environment.advice.maximumForScenarioDecision ||
			(resultModel.scenarioBResults?.roadWorker ?? 0) >= environment.advice.maximumForScenarioDecision
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
		let totalOfScenarioA = (resultModel.scenarioAResults.motorist ?? 0) +
			(resultModel.scenarioAResults.residents ?? 0) +
			(resultModel.scenarioAResults.vkm ?? 0) +
			(resultModel.scenarioAResults.roadWorker ?? 0);

		let totalOfScenarioB = (resultModel.scenarioBResults.motorist ?? 0) +
			(resultModel.scenarioBResults.residents ?? 0) +
			(resultModel.scenarioBResults.vkm ?? 0) +
			(resultModel.scenarioBResults.roadWorker ?? 0);

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
		if ((resultModel.scenarioAResults.motorist ?? 0) >= environment.advice.maximumBeforeMeasureRecs ||
			(resultModel.scenarioBResults.motorist ?? 0) >= environment.advice.maximumBeforeMeasureRecs
		) {
			advices.push(...environment.advice.measureRecs.motorist);
		}

		// RESIDENTS.
		if ((resultModel.scenarioAResults.residents ?? 0) >= environment.advice.maximumBeforeMeasureRecs ||
			(resultModel.scenarioBResults.residents ?? 0) >= environment.advice.maximumBeforeMeasureRecs
		) {
			advices.push(...environment.advice.measureRecs.residents);
		}

		// VKM.
		if ((resultModel.scenarioAResults.vkm ?? 0) >= environment.advice.maximumBeforeMeasureRecs ||
			(resultModel.scenarioBResults.vkm ?? 0) >= environment.advice.maximumBeforeMeasureRecs
		) {
			advices.push(...environment.advice.measureRecs.vkm);
		}

		// ROAD WORKERS.
		if ((resultModel.scenarioAResults.roadWorker ?? 0) >= environment.advice.maximumBeforeMeasureRecs ||
			(resultModel.scenarioBResults.roadWorker ?? 0) >= environment.advice.maximumBeforeMeasureRecs
		) {
			advices.push(...environment.advice.measureRecs.roadWorker);
		}

		return advices;
	}
}
