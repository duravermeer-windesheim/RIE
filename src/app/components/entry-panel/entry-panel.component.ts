import {Component, QueryList, ViewChildren} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {EntryConfig} from '../../models/entry.model';
import {DropdownConfig} from '../../models/dropdown.model';
import {NgForOf} from '@angular/common';
import {EntryComponent} from '../../shared/components/entry/entry.component';
import {DropdownComponent} from '../../shared/components/dropdown/dropdown.component';
import {OutputModel} from '../../models/output.model';

@Component({
  selector: 'app-entry-panel',
  standalone: true,
	imports: [
		SharedModule,
		NgForOf
	],
  templateUrl: './entry-panel.component.html',
  styleUrl: './entry-panel.component.css'
})
export class EntryPanelComponent {
	@ViewChildren(EntryComponent) entryChildren!: QueryList<EntryComponent>;
	@ViewChildren(DropdownComponent) dropdownChildren!: QueryList<DropdownComponent>;

	public dropdowns: DropdownConfig[] = [
		{
			label: 'Type risico',
			code: 'riskType',
			required: true,
			addDefaultEmptyOption: false, /* turn this back to true when the validation issues are fixed */
				items: [
				{
					key: '0',
					value: 'Aangereden op de vluchtstrook',
				},
				{
					key: '1',
					value: 'Schade bij omwoonende',
				},
			]
		},
		{
			label: 'Bereken voor situatie',
			code: 'situation',
			required: true,
			items: [
				{
					key: 'wa',
					value: 'Weg afsluiten',
				},
				{
					key: 'va',
					value: 'Vierkant afsluiten',
				},
			]
		}

	]

	public entries: EntryConfig[] = [
		{
			label: 'Waarschijnlijkheid',
			code: 'probability',
			unit: '?',
			required: true,
			min: 0,
			max: 10,
			defaultValue: 7,
			step: 1,
			placeholder: 'Een nummer tussen 0 en 10',
			validationMessage: 'Waarschijnlijkheid moet tussen 0 en 10 zijn'
		},
		{
			label: 'Blootstelling',
			code: 'frequency',
			unit: '?',
			required: true,
			min: 0.5,
			max: 10,
			defaultValue: 1,
			step: 0.5,
			placeholder: 'Een nummer tussen 0.5 en 10',
			validationMessage: 'Blootstelling moet tussen 0.5 en 10 zijn'
		},
		{
			label: 'Effect',
			code: 'effect',
			unit: '?',
			required: true,
			min: 0,
			max: 40,
			defaultValue: 38,
			step: 1,
			placeholder: 'Een nummer tussen 0 en 40',
			validationMessage: 'Effect moet tussen 0 en 40 zijn'
		},
	]


	// Gets all data of the entry and dropdown fields, then turns them into an OutputModel.
	public getData(): OutputModel {
		let values: { [key: string]: any } = {};

		// Add all values of numerical entry fields.
		this.entryChildren.forEach(entry => {
			let kp = entry.getValue();
			values[kp.key] = kp.value;
		});

		// Add all values of dropdown fields.
		this.dropdownChildren.forEach(entry => {
			let kp = entry.getValue();
			values[kp.key] = kp.value;
		});

		return values as OutputModel;
	}


}
