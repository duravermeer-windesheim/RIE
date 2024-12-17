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

	@Input({required: true})
	public allValid!: boolean;

	@Output()
	public onRemoveMeasure = new EventEmitter<RiskScoreGroupCollectionModel>();

	public calculationSets: CalculationSetModel[] = [{
		"riskGroup": {
			"key": 3,
			"value": "VKM-ploeg"
		},
		"effect": {
			"scenarioA": {
				"key": 15,
				"value": "15 | Eén dode"
			},
			"scenarioB": {
				"key": 40,
				"value": "40 | Meerdere doden"
			}
		},
		"probability": {
			"scenarioA": {
				"key": 0.2,
				"value": "0.2 | Praktisch onmogelijk (nooit van gehoord binnen bedrijfstak en branche)"
			},
			"scenarioB": {
				"key": 1,
				"value": "1 | Onwaarschijnlijk, maar mogelijk in grensgeval (in laatste 10 jaar niet binnen het bedrijf voorgekomen)"
			}
		},
		"frequency": {
			"scenarioA": {
				"key": 3,
				"value": "3 | Af en toe (wekelijks)"
			},
			"scenarioB": {
				"key": 6,
				"value": "6 | Regelmatig (dagelijks)"
			}
		},
		"measures": []
	}];

	// Stores the results calculated from the data model.
	public results!: ResultModel;

	constructor(private riskCalculationService: RiskCalculationService,
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

	// Invoke the onRemoveMeasure output event.
	public removeMeasure(measure: RiskScoreGroupCollectionModel): void {
		this.onRemoveMeasure.emit(measure);
	}

	public addCalculationSet(calculationSet: CalculationSetModel) {
		this.calculationSets.push(calculationSet);
		this.results = this.getResults();
	}
}
