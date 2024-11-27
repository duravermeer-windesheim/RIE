import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {EntryComponent} from '../../shared/entry/entry.component';
import {DropdownComponent} from '../../shared/dropdown/dropdown.component';
import {CalculationModel} from '../../models/result.model';
import {entryConfigs} from '../../config/entries.config';
import {dropdownConfigs} from '../../config/dropdowns.config';
import {defaultDropdownItem, DropdownItem} from '../../models/dropdown.model';
import {RiskScoreGroupCollectionModel} from '../../models/risk.model';
import {SheetDataService} from '../../services/sheet-data.service';
import {environment} from '../../../environments/environment';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {MatOption} from '@angular/material/autocomplete';
import {MatSelect} from '@angular/material/select';
import {SelectedClockModel} from '../../models/selected-clock.model';

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
		FormsModule,
		SharedModule,
		NgForOf,
		NgIf,
		JsonPipe,
		MatSlideToggle,
		MatCheckbox,
		MatRadioGroup,
		MatRadioButton,
		MatOption,
		MatSelect
	],
	templateUrl: './input-panel.component.html',
	styleUrl: './input-panel.component.css'
})
export class InputPanelComponent implements OnInit {

	@ViewChildren(EntryComponent)
	private entryChildren!: QueryList<EntryComponent>;

	@ViewChildren(DropdownComponent)
	private dropdownChildren!: QueryList<DropdownComponent>;

	@ViewChild("measure")
	private measureElement!: DropdownComponent;

	@ViewChild("risk")
	private riskElement!: DropdownComponent;


	// Expose configurations and risk-groups to the template.
	public entries = entryConfigs;
	public dropdowns = dropdownConfigs;
	public riskGroup: any = RiskGroup;


	// Current items in the dropdowns.
	public currentMeasureDropdownOptions: DropdownItem[] = [];
	public currentRiskDropdownOptions: DropdownItem[] = [];
	public selectedRiskDropdownOption: DropdownItem = defaultDropdownItem;


	// Currently selected scenario and riskGroups.
	public selectedScenarioRiskGroup?: {
		scenario: 'a' | 'b',
		riskGroup: RiskGroup
	}

	// All risks out of the spreadsheets.
	private spreadsheetRisks: RiskScoreGroupCollectionModel[] = [];
	private spreadsheetMeasures: RiskScoreGroupCollectionModel[] = [];


	// In case you want to change the default values in the dropdowns.
	public defaultDropdownValues = {
		riskType: defaultDropdownItem,
		measure: defaultDropdownItem
	}

	// Different options a frequency can have.
	public readonly frequencyDropdownItems: DropdownItem[] = [
		{ key: 0.5, value: '0.5 | Zeer zelden' },
		{ key: 1, value: '1 | Zelden (<1% van tijdsduur evenement)' },
		{ key: 2, value: '2 | Soms, ongewoon (>1%, <10% van de tijdsduur evenement)' },
		{ key: 3, value: '3 | Af en toe, occasioneel (>10%, <50% van tijdsduur evenement)' },
		{ key: 6, value: '6 | Regelmatig, frequent (>50%, <90% van tijdsduur evenement)' },
		{ key: 10, value: '10 | Voortdurend, (>90% van tijdsduur evenement)' },
	];

	// Combined object with all relevant and known data.
	public data: CalculationModel = {
		riskScoreValues: {
			probability: 0,
			effect: 0
		},
		riskType: undefined,
		measures: [],
		frequencies: {
			frequencyA: this.frequencyDropdownItems[0],
			frequencyB: this.frequencyDropdownItems[0],
		}
	}

	constructor(private sheetService: SheetDataService) {
	}


	public async ngOnInit(): Promise<void> {
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

	// Trigger the angular change detection system by re-creating the data.
	private reloadData(): void {
		this.data = { ...this.data }
	}


	// Checks if all entries and dropdowns are valid.
	public allValid(): boolean {
		for (let entry of [...this.entryChildren, ...this.dropdownChildren]) {
			if (!entry.isValid()) {
				return false;
			}
		}

		return true;
	}

	// Adds the currently selected measure to the data model.
	public addSelectedMeasure(): void {
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

		// Remove measure from the dropdown options.
		this.currentMeasureDropdownOptions = this.currentMeasureDropdownOptions.filter(m => m.key != measureIdx)
		this.measureElement.value = this.currentMeasureDropdownOptions[0];
	}

	// Removes the given measure from the data model.
	public removeMeasure(measure: RiskScoreGroupCollectionModel): void {
		// Find location of measure.
		let measureIdx = this.spreadsheetMeasures.indexOf(measure);

		// Remove the measure from the selection of measures.
		this.data = { ...this.data, measures: this.data.measures.filter(m => m !== measure) };

		// Add measure back to the dropdown option.
		this.currentMeasureDropdownOptions.push({
			key: measureIdx,
			value: measure.label
		});

		// Update the dropdown.
		this.measureElement.value = this.currentMeasureDropdownOptions[0];
	}

	// Clears measures and refreshes the dropdown.
	private clearMeasures(): void {
		this.data.measures = [];

		this.currentMeasureDropdownOptions = this.sheetService.mapRiskGroupsToDropdownItems(this.spreadsheetMeasures);
		this.measureElement.value = this.currentMeasureDropdownOptions[0];
	}

	// Set a risk score to the riskScoreValues.
	public setRiskScore(key: "effect" | "probability", value: number): void {
		this.data.riskScoreValues[key] = value;
		this.reloadData();
	}

	// Sets a risk type.
	public setRiskType(item: DropdownItem): void {
		this.data.riskType = this.spreadsheetRisks[item.key];

		// Refresh the current selection.
		if (this.selectedScenarioRiskGroup) {
			this.selectDetailRiskScore({
				scenario: this.selectedScenarioRiskGroup.scenario,
				riskGroup: this.selectedScenarioRiskGroup.riskGroup
			});
		}

		this.clearMeasures();
		this.reloadData();
	}

	// Sets the frequency.
	public setFrequency(scenario: 'a' | 'b', item: DropdownItem): void {
		if (scenario == 'a') {
			this.data.frequencies.frequencyA = item;
		} else {
			this.data.frequencies.frequencyB = item;
		}
		this.reloadData();
	}

	// selects a scenario and a risk group.
	public selectDetailRiskScore(selectedClock: SelectedClockModel): void {
		if (!this.data.riskType) {
			return
		}

		// Select the scenario and riskGroup.
		this.selectedScenarioRiskGroup = selectedClock;

		// Binds the input fields to the new scenario.
		let idx = selectedClock.riskGroup.valueOf();
		if (selectedClock.scenario == 'a') {
			this.data.riskScoreValues = this.data.riskType.riskGroups[idx].scenarioARiskScores;
		} else if (selectedClock.scenario == 'b') {
			this.data.riskScoreValues = this.data.riskType.riskGroups[idx].scenarioBRiskScores;
		}
	}
}
