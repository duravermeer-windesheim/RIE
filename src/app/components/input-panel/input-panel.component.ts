import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {EntryComponent} from '../../shared/entry/entry.component';
import {DropdownComponent} from '../../shared/dropdown/dropdown.component';
import {CalculationModel} from '../../models/result.model';
import {entryConfigs} from '../../config/entries.config';
import {dropdownConfigs} from '../../config/dropdowns.config';
import {defaultDropdownItem, DropdownItem} from '../../models/dropdown.model';
import {RiskScoreGroupCollectionModel, RiskScoreModel} from '../../models/risk.model';
import {SheetDataService} from '../../services/sheet-data.service';
import {environment} from '../../../environments/environment';

export enum RiskGroup {
	'Weggebruiker' = 0,
	'Omwonende' = 1,
	'VKM ploeg' = 2,
	'Wegwerker' = 3,
}

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
	public selectedRiskDropdownOption: DropdownItem = defaultDropdownItem;

	public selectedSituationRiskGroup?: {
		situation: 'a' | 'b',
		riskGroup: RiskGroup
	}

	private spreadsheetRisks: RiskScoreGroupCollectionModel[] = [];
	private spreadsheetMeasures: RiskScoreGroupCollectionModel[] = [];

	// In case you want to change the default values in the dropdowns.
	public defaultDropdownValues = {
		riskType: defaultDropdownItem,
		measure: defaultDropdownItem
	}

	// Expose the enum to the HTML.
	public riskGroup: any = RiskGroup;

	public data: CalculationModel = {
		riskScoreValues: {
			probability: 1,
			frequency: 1,
			effect: 1
		},
		riskType: undefined,
		measures: []
	}

	constructor(private sheetService: SheetDataService) {
	}

	async ngOnInit() {
		// Retrieve the risk groups out of the spreadsheet.
		this.spreadsheetRisks = await this.sheetService.getRiskGroups(environment.sheetNames.risks);
		this.spreadsheetMeasures = await this.sheetService.getRiskGroups(environment.sheetNames.measures);

		// Map the risk groups to dropdown options.
		this.currentRiskDropdownOptions = this.sheetService.mapRiskGroupsToDropdownItems(this.spreadsheetRisks);
		this.currentMeasureDropdownOptions = this.sheetService.mapRiskGroupsToDropdownItems(this.spreadsheetMeasures);

		// Default risk type is the first one found.
		this.setRiskType(this.currentRiskDropdownOptions[0]);

		// Set the dropdowns to display the first item.
		this.riskElement.value = this.currentRiskDropdownOptions[0];
		this.measureElement.value = this.currentMeasureDropdownOptions[0];
	}

	// Trigger the angular change detection system.
	private reloadData() {
		this.data = { ...this.data }
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
		this.reloadData();

		// Remove measure from dropdown options.
		this.currentMeasureDropdownOptions = this.currentMeasureDropdownOptions.filter(m => m.key != measureIdx)
		this.measureElement.value = this.currentMeasureDropdownOptions[0];
	}

	public removeMeasure(measure: RiskScoreGroupCollectionModel) {
		// Find location of measure.
		let measureIdx = this.spreadsheetMeasures.indexOf(measure);

		// Remove the measure from the selection of measures.
		// this.data.measures = this.data.measures.filter(m => m != measure);
		this.data = { ...this.data, measures: this.data.measures.filter(m => m !== measure) };
		// Add measure to the dropdown option.
		this.currentMeasureDropdownOptions.push({
			key: measureIdx,
			value: measure.label
		});

		// Update the dropdown.
		this.measureElement.value = this.currentMeasureDropdownOptions[0];
	}


	// Update methods.

	setRiskScore(key: "effect" | "frequency" | "probability", value: number) {
		this.data.riskScoreValues[key] = value;
		this.reloadData();
	}

	setRiskType(item: DropdownItem) {
		this.data.riskType = this.spreadsheetRisks[item.key];

		this.reloadData();
	}

	setDetailRiskScore(situation: 'a' | 'b', riskGroup: RiskGroup) {
		if (!this.data.riskType) {
			return
		}

		this.selectedSituationRiskGroup = {
			situation: situation,
			riskGroup: riskGroup
		};

		let idx = riskGroup.valueOf();

		if (situation == 'a') {
			this.data.riskScoreValues = this.data.riskType.riskGroups[idx].situationARiskScores;
		} else if (situation == 'b') {
			this.data.riskScoreValues = this.data.riskType.riskGroups[idx].situationBRiskScores;
		}
	}
}
