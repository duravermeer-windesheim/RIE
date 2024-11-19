import {
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges
} from '@angular/core';
import {DecimalPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {CalculationModel, ResultModel} from '../../models/result.model';
import {SharedModule} from '../../shared/shared.module';
import {RiskScoreGroupCollectionModel} from '../../models/risk.model';
import {RiskCalculationService} from '../../services/risk-calculation.service';


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
	data!: CalculationModel;

	@Input({required: true})
	allValid!: boolean;

	@Output()
	public onRemoveMeasure = new EventEmitter<RiskScoreGroupCollectionModel>();

	public results!: ResultModel;

	constructor(
		private riskCalculationService: RiskCalculationService,
		private cdref: ChangeDetectorRef) {
	}

	ngOnInit() {
		if (this.allValid) {
			this.getResults();
		}
	}
	ngOnChanges(changes: SimpleChanges): void {
		if (!this.allValid) {
			return;
		}

		if (changes['data']) {
			this.getResults();
		}
	}

	getResults() {
		let results = this.riskCalculationService.getRiskNumbers(this.data);
		if (results) {
			this.results = results;
		} else {
			console.error("Could not calculate risk numbers");
		}
	}

	removeMeasure(measure: RiskScoreGroupCollectionModel) {
		this.onRemoveMeasure.emit(measure);
		this.cdref.detectChanges();
	}

}
