import {RiskScoreGroupCollectionModel, RiskScoreGroupModel, RiskScoreModel} from './risk.model';
import {DropdownItem} from './dropdown.model';

export interface CalculationModel {
	riskType?: RiskScoreGroupCollectionModel,
	riskScoreValues: RiskScoreModel,
	measures: RiskScoreGroupCollectionModel[]
	frequencies: {
		frequencyA: DropdownItem,
		frequencyB: DropdownItem
	};
}

export interface ResultModel {
	scenarioAResults: ResultScenarioModel,
	scenarioBResults: ResultScenarioModel,
}

export interface ResultScenarioModel {
	motorist: number,
	residents: number,
	vkm: number,
	roadWorker: number,
}

export const emptyScenarioModel: ResultScenarioModel = {
	motorist: 0,
	residents: 0,
	vkm: 0,
	roadWorker: 0
}
