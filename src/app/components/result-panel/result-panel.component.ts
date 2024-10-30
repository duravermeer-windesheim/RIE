import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {ResultModel} from '../../models/result.model';
import {SharedModule} from '../../shared/shared.module';
import {DropdownItem} from '../../models/dropdown.model';
import {MeasureModel} from '../../models/measure.model';
import {measuresConfig} from '../../config/measures.config';
import {MeasureTargetType} from '../../models/measure.config';

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
			[MeasureTargetType.Frequency]: 0,
			[MeasureTargetType.Effect]: 0,
			[MeasureTargetType.Probability]: 0
		};

		this.data.measures.forEach(measure => {
			let targets = this.getMeasureEffectTargetsByKey(measure.key);
			targets.forEach(target => {
				switch (target.type) {
					case MeasureTargetType.Frequency:
						effects[MeasureTargetType.Frequency] += target.effect
						break;
					case MeasureTargetType.Effect:
						effects[MeasureTargetType.Effect] += target.effect
						break;
					case MeasureTargetType.Probability:
						effects[MeasureTargetType.Probability] += target.effect
						break;
				}
			})
		})

		return effects;
	}

	removeMeasure(measure: MeasureModel) {
		this.onRemoveMeasure.emit(measure);
		this.cdref.detectChanges();
	}

	getMeasureEffectTargetsByKey(key: number) {
		let measure = measuresConfig.find(measure => measure.key == key);
		if (measure == null) {
			console.log("Requested measure key could not be found");
			return [];
		}

		return measure.targets;
	}
}
