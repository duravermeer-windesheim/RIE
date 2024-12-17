import {RiskScoreGroupCollectionModel, RiskScoreGroupModel, RiskScoreModel} from './risk.model';
import {DropdownItem} from './dropdown.model';
import {AdviceModel} from './advice.model';

export interface CalculationSetModel {
	riskGroup: DropdownItem,
	frequency: {
		scenarioA: DropdownItem,
		scenarioB: DropdownItem,
	},
	effect: {
		scenarioA: DropdownItem,
		scenarioB: DropdownItem,
	},
	probability: {
		scenarioA: DropdownItem,
		scenarioB: DropdownItem,
	},
	measures: RiskScoreGroupCollectionModel[],
}

export interface ResultModel {
	scenarioAResults: ResultScenarioModel,
	scenarioBResults: ResultScenarioModel,
	advice?: AdviceModel
}

export interface ResultScenarioModel {
	motorist?: number,
	residents?: number,
	vkm?: number,
	roadWorker?: number,
}

export const emptyScenarioModel: ResultScenarioModel = {
	motorist: 0,
	residents: 0,
	vkm: 0,
	roadWorker: 0
}
