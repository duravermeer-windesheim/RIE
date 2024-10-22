import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dropdown, DropdownItem} from '../../../models/dropdown.model';
import {NgForOf, NgIf} from '@angular/common';
import {EntryComponent} from '../entry/entry.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  standalone: true,
	imports: [
		NgIf,
		NgForOf,
		EntryComponent,
		FormsModule
	],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements OnInit {

	@Input({required: true})
	public config!: Dropdown;

	@Output()
	onInputChange = new EventEmitter<DropdownItem>();

	public item!: DropdownItem;

	ngOnInit() {
		if (this.config.addDefaultEmptyOption) {
			this.config.items.unshift({
				key: '-1',
				value: 'Selecteer een optie...',
				disabled: this.config.required,
				selected: true
			})
		}

		this.item = this.config?.items[0]
	}

	onChange() {
		this.onInputChange.emit(this.item);
	}

	public get labelCode(): string {
		return this.config.label
			.toLowerCase()
			.trim()
			.replace(/\s+/g, '_');
	}

	public get isValid(): boolean {
		if (!this.config.required) {
			return true;
		}

		return this.item.key !== '-1';
	}

	public getValue() {
		return this.item;
	}

}
