import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DecimalPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {ResultModel} from '../../models/result.model';
import {SharedModule} from '../../shared/shared.module';
import {RiskScoreGroupCollectionModel} from '../../models/risk.model';


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
export class ResultPanelComponent {

	@Input({required: true})
	data!: ResultModel;

	@Input({required: true})
	allValid!: boolean;

	@Output()
	public onRemoveMeasure = new EventEmitter<RiskScoreGroupCollectionModel>();

	constructor(private cdref: ChangeDetectorRef) {
	}

	// TEMP.
	public ticks = Array.from({ length: 8 }, () => Math.floor(Math.random() * 5) + 1);


	removeMeasure(measure: RiskScoreGroupCollectionModel) {
		this.onRemoveMeasure.emit(measure);
		this.cdref.detectChanges();
	}

}
