import { Component, EventEmitter, Input, OnChanges, OnInit, Output,	SimpleChanges} from '@angular/core';
import {DecimalPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {CalculationModel, emptyScenarioModel, ResultModel} from '../../models/result.model';
import {SharedModule} from '../../shared/shared.module';
import {RiskScoreGroupCollectionModel} from '../../models/risk.model';
import {RiskCalculationService} from '../../services/risk-calculation.service';
import {SelectedClockModel} from '../../models/selected-clock.model';
import {AdviceService} from '../../services/advice.service';


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
	public data!: CalculationModel;

	@Input({required: true})
	public allValid!: boolean;

	@Output()
	public onRemoveMeasure = new EventEmitter<RiskScoreGroupCollectionModel>();

	@Output()
	public onSelectClock = new EventEmitter<SelectedClockModel>();

	// Stores the results calculated from the data model.
	public results!: ResultModel;

	constructor(private riskCalculationService: RiskCalculationService, private adviseService: AdviceService) {
	}

	public ngOnInit(): void {
		if (this.allValid) {
			this.results = this.getResults();
		}
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (this.allValid && changes['data']) {
			this.results = this.getResults();
		}
	}

	// Calculates the results.
	public getResults(): ResultModel {
		// Get results.
		let results = this.riskCalculationService.getRiskNumbers(this.data);

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

	// Invoke the onSelectClock output event.
	public clickClock(scenario: 'a' | 'b', riskGroup: number): void {
		this.onSelectClock.emit({
			scenario: scenario,
			riskGroup: riskGroup,
		});
	}
}
