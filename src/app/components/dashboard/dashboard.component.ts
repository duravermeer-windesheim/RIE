import {Component, QueryList, ViewChildren} from '@angular/core';
import {EntryComponent} from '../../shared/components/entry/entry.component';
import {EntryConfig} from '../../models/entry.model';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {DropdownComponent} from '../../shared/components/dropdown/dropdown.component';
import {DropdownConfig, DropdownItem} from '../../models/dropdown.model';
import {SharedModule} from '../../shared/shared.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
	imports: [
		NgForOf,
		SharedModule,
		JsonPipe,
		NgIf
	],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

	@ViewChildren(EntryComponent) entryChildren!: QueryList<EntryComponent>;
	@ViewChildren(DropdownComponent) dropdownChildren!: QueryList<DropdownComponent>;


	entries: EntryConfig[] = [
		{
			label: 'Gereden Snelheid',
			unit: 'KM/U',
			placeholder: 'Speed in KM',
			required: true,
			min: 0,
			max: 130,
			defaultValue: 30,
			validationMessage: 'Snelheid moet een nummer tussen 0 en 130 zijn'
		},
		{
			label: 'Grootte van werkvlak',
			unit: 'Meter',
			placeholder: 'Like 70 meter ofzo???',
			min: 0,
		},
		{
			label: 'Intensiteit verkeer',
			unit: 'Autos per uur',
			placeholder: 'Aantal autos ofzo',
			min: 0,
		},
	]
	dropdown_conf: DropdownConfig = {
		label: 'Nationaliteit',
		required: true,
		addDefaultEmptyOption: false,
		items: [
			{
				key: '0',
				value: 'Nederlands :)',
			},
			{
				key: '0A',
				value: 'Belgisch :|',
			},
			{
				key: '1',
				value: 'Duits :/',
				selected: true,
			},
			{
				key: '2',
				value: 'Frans >:(',
			}
		]
	};

	getValues() {
		let values: {[key: string]: any} = {};

		// Add all values of numerical entry fields.
		this.entryChildren.forEach(entry => {
			values[entry.labelCode] = entry.getValue();
		});

		// Add all values of dropdown fields.
		this.dropdownChildren.forEach(entry => {
			values[entry.labelCode] = entry.getValue();
		});

		return values;
	}

	onInputChange(event: number) {
		console.log(event);
	}

	onDropdownChange(event: DropdownItem) {
		console.log(event);
	}
}
