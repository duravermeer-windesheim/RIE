import {Component, QueryList, ViewChildren} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {NgForOf} from '@angular/common';
import {EntryComponent} from '../../shared/entry/entry.component';
import {DropdownComponent} from '../../shared/dropdown/dropdown.component';
import {ResultModel} from '../../models/result.model';
import {entryConfigs} from '../../config/entries.config';
import {dropdownConfigs} from '../../config/dropdowns.config';

@Component({
	selector: 'app-input-panel',
	standalone: true,
	imports: [
		SharedModule,
		NgForOf
	],
	templateUrl: './input-panel.component.html',
	styleUrl: './input-panel.component.css'
})
export class InputPanelComponent {
	@ViewChildren(EntryComponent) entryChildren!: QueryList<EntryComponent>;
	@ViewChildren(DropdownComponent) dropdownChildren!: QueryList<DropdownComponent>;

	public entries = entryConfigs;
	public dropdowns = dropdownConfigs;

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
}
