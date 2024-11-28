import { Injectable } from '@angular/core';
import {ResultModel} from '../models/result.model';
import {AdviceModel} from '../models/advice.model';

@Injectable({
	providedIn: 'root'
})
export class AdviceService {

	private readonly RISK_THRESHOLD = 70;

	public getAdvice(resultModel: ResultModel): AdviceModel {
		let advices = [];

		// ROAD USER.
		if (resultModel.scenarioAResults.roadUser >= this.RISK_THRESHOLD ||
			resultModel.scenarioBResults.roadUser >= this.RISK_THRESHOLD
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

		return {
			advisedScenario: "a",
			advisedMeasure: [...new Set(advices)]
		}
	}
}
