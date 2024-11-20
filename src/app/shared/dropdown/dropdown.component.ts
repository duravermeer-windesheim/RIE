import {Component, EventEmitter, Input, Output} from '@angular/core';
import {defaultDropdownItem, DropdownConfig, DropdownItem} from '../../models/dropdown.model';
import {BaseInputComponent} from '../base-input.component';

@Component({
	selector: 'app-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrl: './dropdown.component.css'
})
export class DropdownComponent extends BaseInputComponent<DropdownConfig> {

	@Input({required: true})
	public value!: DropdownItem;

	@Input({required: true})
	public items!: DropdownItem[];

	@Input()
	public disabled = false;

	@Input()
	public automaticallySelectFirstItem = false;

	@Output()
	public onValueChange = new EventEmitter<DropdownItem>();

	init() {
		if (this.config.addDefaultEmptyOption) {
			this.items.unshift(defaultDropdownItem);
		}

		this.items.sort((a, b) => a.key - b.key);

		if (this.automaticallySelectFirstItem) {
			this.value = this.items[0];
		}
	}

	public isValid(): boolean {
		if (!this.config.required) {
			return true;
		}

		return this.value.key !== -1;
	}

	onChange() {
		this.onValueChange.emit(this.value);
	}
}
