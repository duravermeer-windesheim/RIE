import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {ResultModel} from '../../models/result.model';
import {SharedModule} from '../../shared/shared.module';
import {MeasureModel} from '../../models/measure.model';


export enum MeasureTargetType {
	Probability = 'probability',
	Frequency = 'frequency',
	Effect = 'effect'
}


@Component({
	selector: 'app-result-panel',
	standalone: true,
	imports: [
		JsonPipe,
		NgIf,
		SharedModule,
		NgForOf,
	],
	templateUrl: './result-panel.component.html',
	styleUrl: './result-panel.component.css'
})
export class ResultPanelComponent {

	@Input({required: true})
	data!: ResultModel;

	@Input({required: true})
	allValid!: boolean;

	@Output()
	public onRemoveMeasure = new EventEmitter<MeasureModel>();

	constructor(private cdref: ChangeDetectorRef) {
	}

	public getAllEffects() {
		let effects: {[key in MeasureTargetType]: number } = {
			[MeasureTargetType.Effect]: 0,
			[MeasureTargetType.Frequency]: 0,
			[MeasureTargetType.Probability]: 0
		};

		this.data.measures.forEach(measure => {
			effects[MeasureTargetType.Effect] += measure.effect;
			effects[MeasureTargetType.Frequency] += measure.frequency;
			effects[MeasureTargetType.Probability] += measure.probability;
		});

		return effects;
	}

	removeMeasure(measure: MeasureModel) {
		this.onRemoveMeasure.emit(measure);
		this.cdref.detectChanges();
	}

}
