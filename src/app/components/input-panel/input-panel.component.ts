import {ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {NgForOf, NgIf} from '@angular/common';
import {EntryComponent} from '../../shared/entry/entry.component';
import {DropdownComponent} from '../../shared/dropdown/dropdown.component';
import {ResultModel} from '../../models/result.model';
import {entryConfigs} from '../../config/entries.config';
import {dropdownConfigs} from '../../config/dropdowns.config';
import {DropdownItem} from '../../models/dropdown.model';
import {SheetDataService} from '../../services/sheet-data.service';
import {MeasureModel} from '../../models/measure.model';

@Component({
	selector: 'app-input-panel',
	standalone: true,
	imports: [
		SharedModule,
		NgForOf,
		NgIf
	],
	templateUrl: './input-panel.component.html',
	styleUrl: './input-panel.component.css'
})
export class InputPanelComponent implements OnInit {
	@ViewChildren(EntryComponent) entryChildren!: QueryList<EntryComponent>;
	@ViewChildren(DropdownComponent) dropdownChildren!: QueryList<DropdownComponent>;
	@ViewChild("measure") measureElement!: DropdownComponent;

	public entries = entryConfigs;
	public dropdowns = dropdownConfigs;

	public currentMeasureDropdownOptions: DropdownItem[] = [];

	public spreadsheetMeasures: MeasureModel[] = [];
	public appliedMeasures: MeasureModel[] = [];

	constructor(private cdref: ChangeDetectorRef, private sheetDataService: SheetDataService) {
	}

	async ngOnInit() {
		this.spreadsheetMeasures = await this.sheetDataService.getMeasuresFromSheets();

		this.currentMeasureDropdownOptions = this.spreadsheetMeasures.map(measure => ({
			key: measure.code,
			value: measure.label
		}));

		this.measureElement.value = this.currentMeasureDropdownOptions[0];
	}

	// Gets all data of the entry and dropdown fields, then turns them into an ResultModel.
	public getData(): ResultModel {
		let values: { [key: string]: any } = {};

		// Add all values of numerical entry fields.
		this.entryChildren.forEach(entry => {
			let kp = entry.getKeyValue();
			values[kp.key] = kp.value;
		});

		// Add all values of dropdown fields.
		this.dropdownChildren.forEach(entry => {
			let kp = entry.getKeyValue();
			values[kp.key] = kp.value;
		});

		values["measures"] = this.appliedMeasures;
		return values as ResultModel;
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
		this.appliedMeasures.push(measure);

		// Remove measure from dropdown options.
		this.currentMeasureDropdownOptions = this.currentMeasureDropdownOptions.filter(m => m.key != measure.code);

		// Update the dropdown
		this.cdref.detectChanges();
		this.measureElement?.refreshItems();
	}

	public removeMeasure(measure: MeasureModel) {
		// Remove the measure from the selection of measures.
		this.appliedMeasures = this.appliedMeasures.filter(m => m.code !== measure.code);

		// Add measure to the dropdown option.
		this.currentMeasureDropdownOptions.push({
			key: measure.code,
			value: measure.label
		});

		// Update the dropdown.
		this.cdref.detectChanges();
		this.measureElement?.refreshItems();
	}
}
