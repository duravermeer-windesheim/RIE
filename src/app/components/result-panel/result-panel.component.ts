import { Component, EventEmitter, Input, OnChanges, OnInit, Output,	SimpleChanges} from '@angular/core';
import {DecimalPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {CalculationSetModel, emptyScenarioModel, ResultModel} from '../../models/result.model';
import {SharedModule} from '../../shared/shared.module';
import {RiskScoreGroupCollectionModel} from '../../models/risk.model';
import {RiskCalculationService} from '../../services/risk-calculation.service';
import {AdviceService} from '../../services/advice.service';
import {CalculationOverviewDialogComponent} from '../calculation-overview-dialog/calculation-overview-dialog.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
	selector: 'app-result-panel',
	standalone: true,
	imports: [
		JsonPipe,
		NgIf,
		SharedModule,
		NgForOf,
		DecimalPipe,
	],
	templateUrl: './result-panel.component.html',
	styleUrl: './result-panel.component.css',
	providers: [DecimalPipe]
})
export class ResultPanelComponent implements OnInit, OnChanges {

	public calculationSets: CalculationSetModel[] = [
		// {
		// 	"riskGroup": {
		// 		"key": 3,
		// 		"value": "VKM-ploeg"
		// 	},
		// 	"effect": {
		// 		"scenarioA": {
		// 			"key": 40,
		// 			"value": "40 | Meerdere doden"
		// 		},
		// 		"scenarioB": {
		// 			"key": 15,
		// 			"value": "15 | Eén dode"
		// 		}
		// 	},
		// 	"probability": {
		// 		"scenarioA": {
		// 			"key": 0.5,
		// 			"value": "0.5 | Denkbaar, maar onwaarschijnlijk (wel van gehoord binnen bedrijfstak en branche, maar niet binnen het bedrijf zelf)"
		// 		},
		// 		"scenarioB": {
		// 			"key": 6,
		// 			"value": "6 | Zeer wel mogelijk (enkele keren per jaar binnen het bedrijf gebeurd)"
		// 		}
		// 	},
		// 	"frequency": {
		// 		"scenarioA": {
		// 			"key": 6,
		// 			"value": "6 | Regelmatig (dagelijks)"
		// 		},
		// 		"scenarioB": {
		// 			"key": 10,
		// 			"value": "10 | Voortdurend"
		// 		}
		// 	},
		// 	"measures": [
		// 		{
		// 			"label": "Drempels neerleggen",
		// 			"riskGroups": [
		// 				{
		// 					"group": "Automobilist",
		// 					"scenarioARiskScores": {
		// 						"effect": 0,
		// 						"probability": 0
		// 					},
		// 					"scenarioBRiskScores": {
		// 						"effect": 0,
		// 						"probability": 0
		// 					}
		// 				},
		// 				{
		// 					"group": "Omwonende",
		// 					"scenarioARiskScores": {
		// 						"effect": 0,
		// 						"probability": 0
		// 					},
		// 					"scenarioBRiskScores": {
		// 						"effect": 0,
		// 						"probability": 0
		// 					}
		// 				},
		// 				{
		// 					"group": "VKM ploeg",
		// 					"scenarioARiskScores": {
		// 						"effect": 15,
		// 						"probability": 6
		// 					},
		// 					"scenarioBRiskScores": {
		// 						"effect": 15,
		// 						"probability": -8
		// 					}
		// 				},
		// 				{
		// 					"group": "Wegwerker",
		// 					"scenarioARiskScores": {
		// 						"effect": 0,
		// 						"probability": 0
		// 					},
		// 					"scenarioBRiskScores": {
		// 						"effect": 0,
		// 						"probability": 0
		// 					}
		// 				}
		// 			]
		// 		},
		// 		{
		// 			"label": "Snelheid verlagen",
		// 			"riskGroups": [
		// 				{
		// 					"group": "Automobilist",
		// 					"scenarioARiskScores": {
		// 						"effect": 0,
		// 						"probability": 0
		// 					},
		// 					"scenarioBRiskScores": {
		// 						"effect": 0,
		// 						"probability": 0
		// 					}
		// 				},
		// 				{
		// 					"group": "Omwonende",
		// 					"scenarioARiskScores": {
		// 						"effect": 0,
		// 						"probability": 0
		// 					},
		// 					"scenarioBRiskScores": {
		// 						"effect": 0,
		// 						"probability": 0
		// 					}
		// 				},
		// 				{
		// 					"group": "VKM ploeg",
		// 					"scenarioARiskScores": {
		// 						"effect": -4,
		// 						"probability": -2
		// 					},
		// 					"scenarioBRiskScores": {
		// 						"effect": -3,
		// 						"probability": -1
		// 					}
		// 				},
		// 				{
		// 					"group": "Wegwerker",
		// 					"scenarioARiskScores": {
		// 						"effect": 0,
		// 						"probability": 0
		// 					},
		// 					"scenarioBRiskScores": {
		// 						"effect": 0,
		// 						"probability": 0
		// 					}
		// 				}
		// 			]
		// 		}
		// 	]
		// }
	];

	// Stores the results calculated from the data model.
	public results!: ResultModel;

	constructor(
		private riskCalculationService: RiskCalculationService,
		private adviseService: AdviceService,
		private dialog: MatDialog) {
	}

	public ngOnInit(): void {
		this.results = this.getResults();
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (this.calculationSets.length >= 1 && changes['data']) {
			this.results = this.getResults();
		}
	}

	public openDialog(): void {
		this.dialog.open(CalculationOverviewDialogComponent, {
			width: "800px",
			maxWidth: 'none',
			panelClass: 'dialog-container',
			data: {
				calculationSets: this.calculationSets
			}
		});
	}

	// Calculates the results.
	public getResults(): ResultModel {
		// Get results.
		let results = this.riskCalculationService.getRiskNumbers(this.calculationSets);

		// If results couldn't be calculated, return empty results.
		if (!results) {
			console.error("Could not calculate risk numbers");
			return {
				scenarioAResults: emptyScenarioModel,
				scenarioBResults: emptyScenarioModel,
			};
		}

		return results;
	}

	public addCalculationSet(calculationSet: CalculationSetModel) {
		this.calculationSets.push(calculationSet);
		this.results = this.getResults();
	}
}
