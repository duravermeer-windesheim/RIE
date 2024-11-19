
export interface RiskScoreGroupCollectionModel  {
	label: string,
	riskGroups: RiskScoreGroupModel[]
}

export interface RiskScoreGroupModel {
	group: string,
	situationARiskScores: RiskScoreModel,
	situationBRiskScores: RiskScoreModel,
}

export interface RiskScoreModel {
	effect: number,
	frequency: number,
	probability: number,
}
