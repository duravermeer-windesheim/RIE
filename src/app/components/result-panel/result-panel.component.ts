import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {ResultModel} from '../../models/result.model';
import {SharedModule} from '../../shared/shared.module';
import {DropdownItem} from '../../models/dropdown.model';
import {KeyValuePair} from '../../models/keyvalue.model';
import {SheetDataService} from '../../services/sheet-data.service';


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
export class ResultPanelComponent implements OnInit {

	@Input({required: true})
	data!: ResultModel;

	@Input({required: true})
	allValid!: boolean;

	@Output()
	public onRemoveMeasure = new EventEmitter<KeyValuePair>();

	private spreadsheetCache: any;

	constructor(private cdref: ChangeDetectorRef, private sheetDataService: SheetDataService) {
	}

	async ngOnInit() {
		await this.handleSpreadsheetCache();
	}

	public getAllEffects() {
		let effects: {[key in MeasureTargetType]: number } = {
			[MeasureTargetType.Effect]: 0,
			[MeasureTargetType.Frequency]: 0,
			[MeasureTargetType.Probability]: 0
		};

		this.data.measures.forEach(measure => {
			let targets = this.getMeasureEffectTargetsByKey(measure.key);
			targets.forEach((target: any) => {
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

	removeMeasure(measure: KeyValuePair) {
		this.onRemoveMeasure.emit(measure);
		this.cdref.detectChanges();
	}

	async handleSpreadsheetCache() {
		try {
			const result = await this.sheetDataService.getSheetData('Maatregelen');
			this.spreadsheetCache = result.values.splice(1) || [];
		} catch (error) {
			console.error("Could not retrieve data from sheet. Error: ", error);
			this.spreadsheetCache = [];
		}
	}

	getMeasureEffectTargetsByKey(key: number) {
		let measure = this.spreadsheetCache.find((record: any) => record[0] == key)
		if (measure == null) {
			console.log("Requested measure key could not be found");
			return [];
		}

		return [
			{
				type: MeasureTargetType.Effect,
				effect: parseInt(measure[2]) || 0,
			},
			{
				type: MeasureTargetType.Frequency,
				effect: parseInt(measure[3]) || 0,
			},
			{
				type: MeasureTargetType.Probability,
				effect: parseInt(measure[4]) || 0,
			}
		]
	}
}
