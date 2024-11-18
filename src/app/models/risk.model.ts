
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
	probability: number,
	frequency: number,
	effect: number,
}
