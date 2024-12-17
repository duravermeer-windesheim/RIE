import {Component, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {DropdownComponent} from '../../shared/dropdown/dropdown.component';
import {CalculationSetModel} from '../../models/result.model';
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

	@ViewChildren(DropdownComponent)
	private dropdownChildren!: QueryList<DropdownComponent>;

	@ViewChild("measure")
	private measureElement!: DropdownComponent;

	@ViewChild("riskGroup")
	private riskElement!: DropdownComponent;

	@Output()
	public onAddCalculationSet = new EventEmitter<CalculationSetModel>();


	// Expose configurations and risk-groups to the template.
	public dropdowns = dropdownConfigs;


	// Current items in the dropdowns.
	public currentMeasureDropdownOptions: DropdownItem[] = [];

	// All measures out of the spreadsheets.
	private spreadsheetMeasures: RiskScoreGroupCollectionModel[] = [];


	// In case you want to change the default values in the dropdowns.
	public defaultDropdownValues = {
		measure: defaultDropdownItem
	}

	public riskGroupDropdowns = dropdownConfigs['riskGroup'].defaultItems;


	// Different options a frequency can have.
	// Combined object with all relevant and known data.
	public data: CalculationSetModel = {
		riskGroup:this.riskGroupDropdowns[0],
		effect: {
			scenarioA: dropdownConfigs['effectA'].defaultItems[0],
			scenarioB: dropdownConfigs['effectB'].defaultItems[0],
		},
		probability: {
			scenarioA: dropdownConfigs['probabilityA'].defaultItems[0],
			scenarioB: dropdownConfigs['probabilityB'].defaultItems[0],
		},
		frequency: {
			scenarioA: dropdownConfigs['freqA'].defaultItems[0],
			scenarioB: dropdownConfigs['freqB'].defaultItems[0],
		},
		measures: [],
	}

	constructor(private sheetService: SheetDataService) {
	}


	public async ngOnInit(): Promise<void> {
		// Retrieve the risk groups out of the spreadsheet.
		this.spreadsheetMeasures = await this.sheetService.getRiskGroups(environment.sheetNames.measures);

		// Map the risk groups to dropdown options.
		this.currentMeasureDropdownOptions = this.sheetService.mapRiskGroupsToDropdownItems(this.spreadsheetMeasures);

		// Set the dropdowns to display the first item.
		this.measureElement.value = this.currentMeasureDropdownOptions[0];
	}

	// Trigger the angular change detection system by re-creating the data.
	private reloadData(): void {
		this.data = { ...this.data }
	}


	// Checks if all entries and dropdowns are valid.
	public allValid(): boolean {
		for (let entry of this.dropdownChildren) {
			if (!entry.isValid()) {
				return false;
			}
		}

		return true;
	}

	public applyRisk() {
		this.onAddCalculationSet.emit(JSON.parse(JSON.stringify(this.data)));

		// Remove risk from dropdown.
		this.riskGroupDropdowns = this.riskGroupDropdowns.filter((riskGroup: DropdownItem) => riskGroup != this.data.riskGroup);

		this.reloadDropdowns();
	}

	private reloadDropdowns() {

		// Fill the correct values.
		this.data.riskGroup = dropdownConfigs['riskGroup'].defaultItems[0];
		this.data.effect = {
			scenarioA: dropdownConfigs['effectA'].defaultItems[0],
			scenarioB: dropdownConfigs['effectB'].defaultItems[0],
		};
		this.data.probability = {
			scenarioA: dropdownConfigs['probabilityA'].defaultItems[0],
			scenarioB: dropdownConfigs['probabilityB'].defaultItems[0],
		};
		this.data.frequency = {
			scenarioA: dropdownConfigs['freqA'].defaultItems[0],
			scenarioB: dropdownConfigs['freqB'].defaultItems[0],
		};

		// Reset all interactions.
		this.dropdownChildren.forEach(ddc => {
			ddc.resetInteraction();
		})
	}

	// Adds the currently selected measure to the data model.
	public addSelectedMeasure(): void {
		// Get selected measure.
		let keyValue = this.measureElement.getKeyValue();
		let measureLabel = keyValue.value.value;
		let measure = this.spreadsheetMeasures.find(measure => measure.label == measureLabel);

		if (measure == null) {
			return;
		}

		// Add the measure.
		this.data.measures.push(measure);
		this.reloadData();

		// Remove measure from the dropdown options.
		this.currentMeasureDropdownOptions = this.currentMeasureDropdownOptions.filter(m => m.value != measureLabel);
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

	// Resets measures and refreshes the dropdown.
	private refreshMeasures(): void {
		this.data.measures = [];

		// Grab the measures that are allowed by the current risk type.
		this.currentMeasureDropdownOptions = this.sheetService.mapRiskGroupsToDropdownItems(this.spreadsheetMeasures);
		this.measureElement.value = this.currentMeasureDropdownOptions[0];
	}

	// Sets a risk group.
	public setRiskGroup(item: DropdownItem): void {
		this.data.riskGroup = item;

		this.refreshMeasures();
		this.reloadData();
	}

	public setRiskScore(scenario: 'a' | 'b',key: 'frequency' | 'probability' | 'effect', value: DropdownItem) {
		let scenarioKey: 'scenarioA' | 'scenarioB' = scenario == 'a' ? 'scenarioA' : 'scenarioB';
		this.data[key][scenarioKey] = value;
	}
}
