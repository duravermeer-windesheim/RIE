import {RiskScoreGroupCollectionModel, RiskScoreGroupModel, RiskScoreModel} from './risk.model';

export interface CalculationModel {
	riskType: RiskScoreGroupCollectionModel | {},
	riskScoreValues: RiskScoreModel,
	measures: RiskScoreGroupCollectionModel[]
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

