import { Component, EventEmitter, Input, OnChanges, OnInit, Output,	SimpleChanges} from '@angular/core';
import {DecimalPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import { CalculationSetModel, emptyCalculationSetModel, emptyScenarioModel, ResultModel } from '../../models/result.model';
import {SharedModule} from '../../shared/shared.module';
import {RiskCalculationService} from '../../services/risk-calculation.service';
import {AdviceService} from '../../services/advice.service';
import {CalculationOverviewDialogComponent} from '../calculation-overview-dialog/calculation-overview-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {dropdownConfigs} from '../../config/dropdowns.config';


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

	@Output()
	public onSelectClock = new EventEmitter<CalculationSetModel>();

	constructor(
		private riskCalculationService: RiskCalculationService,
		private adviseService: AdviceService,
		private dialog: MatDialog) {
	}

	public ngOnInit(): void {
		this.results = this.getResults();
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (this.calculationSets.length >= 1 && changes['calculationSets']) {
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
		// Remove existing of the current type.
		this.calculationSets = this.calculationSets.filter(cs => cs.riskGroup.key != calculationSet.riskGroup.key);
		this.calculationSets.push(calculationSet);
		this.results = this.getResults();
	}

	// Invoke the onSelectClock output event.
	public clickClock(riskGroup: number): void {
		let calculationSet = this.calculationSets.find(cs => cs.riskGroup.key == riskGroup);
		if (!calculationSet) {
			let emptyCalculationSet = emptyCalculationSetModel;
			emptyCalculationSet.riskGroup = dropdownConfigs['riskGroup'].defaultItems[riskGroup];
			this.onSelectClock.emit(emptyCalculationSet);
			return;
		}

		this.onSelectClock.emit(calculationSet);
	}
}
