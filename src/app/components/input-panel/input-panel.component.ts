import {
	ChangeDetectorRef,
	Component,
	EventEmitter,
	OnInit,
	Output,
	QueryList,
	ViewChild,
	ViewChildren
} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {EntryComponent} from '../../shared/entry/entry.component';
import {DropdownComponent} from '../../shared/dropdown/dropdown.component';
import {ResultModel} from '../../models/result.model';
import {entryConfigs} from '../../config/entries.config';
import {dropdownConfigs} from '../../config/dropdowns.config';
import {defaultDropdownItem, DropdownItem} from '../../models/dropdown.model';
import {RiskScoreGroupCollectionModel, RiskScoreModel} from '../../models/risk.model';
import {SheetDataService} from '../../services/sheet-data.service';
import {environment} from '../../../environments/environment';

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

	@Output()
	public tempOnTickReload = new EventEmitter();

	public entries = entryConfigs;
	public dropdowns = dropdownConfigs;

	public currentMeasureDropdownOptions: DropdownItem[] = [];
	public currentRiskDropdownOptions: DropdownItem[] = []

	private spreadsheetRisks: RiskScoreGroupCollectionModel[] = [];
	private spreadsheetMeasures: RiskScoreGroupCollectionModel[] = [];


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

	constructor(private sheetService: SheetDataService) {
	}

	async ngOnInit() {
		this.spreadsheetRisks = await this.sheetService.getRiskGroups(environment.sheetNames.risks);
		this.spreadsheetMeasures = await this.sheetService.getRiskGroups(environment.sheetNames.measures);

		this.currentRiskDropdownOptions = this.spreadsheetRisks.map((risk, index) => ({
			key: index,
			value: risk.label
		}));

		this.currentMeasureDropdownOptions = this.spreadsheetMeasures.map((measure, index) => ({
			key: index,
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
		let measureIdx = keyValue.value.key;
		let measure = this.spreadsheetMeasures[measureIdx];

		if (measure == null) {
			return;
		}

		// Add the measure.
		this.data.measures.push(measure);

		// TEMP. Change the clocks.
		this.tempOnTickReload.emit();

		// Remove measure from dropdown options.
		this.currentMeasureDropdownOptions = this.currentMeasureDropdownOptions.filter(m => m.key != measureIdx)
		this.measureElement.value = this.currentMeasureDropdownOptions[0];
	}

	public removeMeasure(measure: RiskScoreGroupCollectionModel) {
		// Find location of measure.
		let measureIdx = this.spreadsheetMeasures.indexOf(measure);

		// Remove the measure from the selection of measures.
		this.data.measures = this.data.measures.filter(m => m != measure);

		// Add measure to the dropdown option.
		this.currentMeasureDropdownOptions.push({
			key: measureIdx,
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
