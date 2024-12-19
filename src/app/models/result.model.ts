import {RiskScoreGroupCollectionModel, RiskScoreGroupModel, RiskScoreModel} from './risk.model';
import {DropdownItem} from './dropdown.model';
import {AdviceModel} from './advice.model';
import {dropdownConfigs} from '../config/dropdowns.config';

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

export const emptyCalculationSetModel = {
	riskGroup: dropdownConfigs['riskGroup'].defaultItems[0],
	effect: {
		scenarioA: dropdownConfigs['effectA'].defaultItems[0],
		scenarioB: dropdownConfigs['effectB'].defaultItems[0],
	},
	probability: {
		scenarioA: dropdownConfigs['probabilityA'].defaultItems[0],
		scenarioB: dropdownConfigs['probabilityB'].defaultItems[0],
	},
	frequency: {
		scenarioA: dropdownConfigs['freqA'].defaultItems[0],
		scenarioB: dropdownConfigs['freqB'].defaultItems[0],
	},
	measures: [],
}
