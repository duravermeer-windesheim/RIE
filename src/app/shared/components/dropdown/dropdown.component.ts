import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DropdownConfig, DropdownItem} from '../../../models/dropdown.model';

@Component({
	selector: 'app-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements OnInit {

	@Input({required: true})
	public config!: DropdownConfig;

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

		this.item = this.config?.items.find(item => item.selected) || this.config?.items[0];
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
