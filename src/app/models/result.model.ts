import {RiskScoreGroupCollectionModel, RiskScoreModel} from './risk.model';
import {DropdownItem} from './dropdown.model';

export interface ResultModel {
	riskType: DropdownItem,
	riskScoreValues: RiskScoreModel,
	measures: RiskScoreGroupCollectionModel[]
}
