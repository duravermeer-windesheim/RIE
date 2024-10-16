import {Component, QueryList, ViewChildren} from '@angular/core';
import {EntryComponent} from '../../shared/components/entry/entry.component';
import {Entry} from '../../models/entry.model';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
	imports: [
		EntryComponent,
		NgForOf
	],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

	@ViewChildren(EntryComponent) children!: QueryList<EntryComponent>;

	entries: Entry[] = [
		{
			label: 'Gereden Snelheid',
			unit: 'KM/U',
			placeholder: 'Speed in KM',
			required: true,
			min: 0,
			max: 130,
			defaultValue: 90
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

	onInputChange(event: number) {
		this.children.forEach((child) => {
			console.log(child.value);
		});
	}
}
