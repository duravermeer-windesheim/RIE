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
	roadUser: number,
	residents: number,
	vkm: number,
	roadWorker: number,
}

