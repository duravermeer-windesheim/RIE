import {ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {NgForOf, NgIf} from '@angular/common';
import {EntryComponent} from '../../shared/entry/entry.component';
import {DropdownComponent} from '../../shared/dropdown/dropdown.component';
import {ResultModel} from '../../models/result.model';
import {entryConfigs} from '../../config/entries.config';
import {dropdownConfigs} from '../../config/dropdowns.config';
import {DropdownItem} from '../../models/dropdown.model';
import {KeyValuePair} from '../../models/keyvalue.model';
import {SheetDataService} from '../../services/sheet-data.service';

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

	public currentMeasureOptions: DropdownItem[] = this.dropdowns["measure"].defaultItems;

	public measures: KeyValuePair[] = [];

	constructor(private cdref: ChangeDetectorRef, private sheetDataService: SheetDataService) {
	}

	async ngOnInit() {
		this.currentMeasureOptions = await this.getMeasureOptions();
		this.measureElement.value = this.currentMeasureOptions[0];
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

		values["measures"] = this.measures;
		return values as ResultModel;
	}

	async getMeasureOptions() {
		// Get data from Google sheets.
		let data;
		try {
			const result = await this.sheetDataService.getSheetData('Maatregelen');
			data = result.values || [];
		} catch (error) {
			console.error("Could not retrieve data from sheet. Error: ", error);
			data = [];
		}

		// Format the data as a list of dropdown items.
		return data.slice(1).map((item: any) => ({
			key: item[0],
			value: item[1],
		}));
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

	addSelectedMeasure() {
		// Get selected measure.
		let keyValue = this.measureElement.getKeyValue();
		let measure = keyValue.value;

		// Add the measure.
		this.measures.push(measure);

		// Remove measure from dropdown options.
		this.currentMeasureOptions = this.currentMeasureOptions.filter(mes => mes.key != measure.key);

		// Update the dropdown
		this.cdref.detectChanges();
		this.measureElement?.refreshItems();
	}

	public removeMeasure(measure: KeyValuePair) {
		// Remove the measure from the selection of measures.
		this.measures = this.measures.filter(measureCode => measureCode.key !== measure.key);

		// Add measure to the dropdown option.
		this.currentMeasureOptions.push(measure);

		// Update the dropdown.
		this.cdref.detectChanges();
		this.measureElement?.refreshItems();
	}
}
