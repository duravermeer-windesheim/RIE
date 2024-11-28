
export interface RiskScoreGroupCollectionModel  {
	label: string,
	extras?: string[],
	riskGroups: RiskScoreGroupModel[]
}

export interface RiskScoreGroupModel {
	group: string,
	scenarioARiskScores: RiskScoreModel,
	scenarioBRiskScores: RiskScoreModel,
}

export interface RiskScoreModel {
	effect: number,
	probability: number,
}
