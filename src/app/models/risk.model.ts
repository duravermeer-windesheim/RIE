
export interface RiskModel {
	label: string,
	riskGroups: RiskGroupModel[]
}

export interface RiskGroupModel {
	group: string,
	situationARiskScores: RiskScoreModel,
	situationBRiskScores: RiskScoreModel,
}

export interface RiskScoreModel {
	probability: number,
	frequency: number,
	effect: number,
}
