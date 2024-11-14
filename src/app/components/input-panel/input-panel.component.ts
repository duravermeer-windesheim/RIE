import {ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {EntryComponent} from '../../shared/entry/entry.component';
import {DropdownComponent} from '../../shared/dropdown/dropdown.component';
import {ResultModel} from '../../models/result.model';
import {entryConfigs} from '../../config/entries.config';
import {dropdownConfigs} from '../../config/dropdowns.config';
import {defaultDropdownItem, DropdownItem} from '../../models/dropdown.model';
import {MeasureModel} from '../../models/measure.model';
import {RiskModel, RiskScoreModel} from '../../models/risk.model';
import {SheetMeasureService} from '../../services/sheet-services/sheet-measure.service';
import {SheetRiskService} from '../../services/sheet-services/sheet-risk.service';

@Component({
	selector: 'app-input-panel',
	standalone: true,
	imports: [
		SharedModule,
		NgForOf,
		NgIf,
		JsonPipe
	],
	templateUrl: './input-panel.component.html',
	styleUrl: './input-panel.component.css'
})
export class InputPanelComponent implements OnInit {
	@ViewChildren(EntryComponent) entryChildren!: QueryList<EntryComponent>;
	@ViewChildren(DropdownComponent) dropdownChildren!: QueryList<DropdownComponent>;
	@ViewChild("measure") measureElement!: DropdownComponent;
	@ViewChild("risk") riskElement!: DropdownComponent;

	public entries = entryConfigs;
	public dropdowns = dropdownConfigs;

	public currentMeasureDropdownOptions: DropdownItem[] = [];
	public currentRiskDropdownOptions: DropdownItem[] = []

	private spreadsheetRisks: RiskModel[] = [];
	private spreadsheetMeasures: MeasureModel[] = [];


	// In case you want to change the default values in the dropdowns.
	public defaultDropdownValues = {
		riskType: defaultDropdownItem,
		measure: defaultDropdownItem
	}

	public data: ResultModel = {
		riskScoreValues: {
			probability: 0,
			frequency: 0.5,
			effect: 0
		},
		riskType: this.defaultDropdownValues.riskType,
		measures: []
	}

	constructor (
		private sheetMeasureService: SheetMeasureService,
		private sheetRiskService: SheetRiskService) { }

	async ngOnInit() {
		this.spreadsheetRisks = await this.sheetRiskService.getSheetData();
		this.spreadsheetMeasures = await this.sheetMeasureService.getSheetData();

		this.currentRiskDropdownOptions = this.spreadsheetRisks.map((risk, index) => ({
			key: index,
			value: risk.label
		}));

		this.currentMeasureDropdownOptions = this.spreadsheetMeasures.map(measure => ({
			key: measure.code,
			value: measure.label
		}));

		this.riskElement.value = this.currentRiskDropdownOptions[0];
		this.measureElement.value = this.currentMeasureDropdownOptions[0];
	}

	// Checks if everything in the input panel is valid.
	public allValid(): boolean {
		for (let entry of [...this.entryChildren, ...this.dropdownChildren]) {
			if (!entry.isValid()) {
				return false;
			}
		}

		return true;
	}

	async addSelectedMeasure() {
		// Get selected measure.
		let keyValue = this.measureElement.getKeyValue();

		let measure = this.spreadsheetMeasures.find(m => m.code === keyValue.value.key);
		if (measure == null) {
			return;
		}

		// Add the measure.
		this.data.measures.push(measure);

		// Remove measure from dropdown options.
		this.currentMeasureDropdownOptions = this.currentMeasureDropdownOptions.filter(m => m.key != measure.code);
		this.measureElement.value = this.currentMeasureDropdownOptions[0];
	}

	public removeMeasure(measure: MeasureModel) {
		// Remove the measure from the selection of measures.
		this.data.measures = this.data.measures.filter(m => m.code !== measure.code);

		// Add measure to the dropdown option.
		this.currentMeasureDropdownOptions.push({
			key: measure.code,
			value: measure.label
		});

		// Update the dropdown.
		this.measureElement.value = this.currentMeasureDropdownOptions[0];
	}


	// Update methods.
	setRiskScore(key: "effect" | "probability" | "frequency", value: number) {
		this.data.riskScoreValues[key] = value;
	}

	setRiskType(item: DropdownItem) {
		this.data.riskType = item;

		// TEMP.
		this.spreadsheetRisks.forEach(risk => {
			if (risk.label == item.value) {
				this.data.riskScoreValues.probability = risk.riskGroups[3].situationARiskScores.probability;
				this.data.riskScoreValues.frequency = risk.riskGroups[3].situationARiskScores.frequency;
				this.data.riskScoreValues.effect = risk.riskGroups[3].situationARiskScores.effect;
			}
		});
	}
}
