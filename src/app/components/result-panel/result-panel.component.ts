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

	public calculationSets: CalculationSetModel[] = [];

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
