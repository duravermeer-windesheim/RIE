import {AfterRenderRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DropdownConfig, DropdownItem} from '../../models/dropdown.model';
import {BaseInputComponent} from '../base-input.component';

@Component({
	selector: 'app-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrl: './dropdown.component.css'
})
export class DropdownComponent extends BaseInputComponent<DropdownConfig> {
	public value!: DropdownItem;

	@Input({required: true})
	public items!: DropdownItem[];

	init() {
		if (this.config.addDefaultEmptyOption) {
			this.items.unshift( {
				key: -1,
				value: 'Selecteer een optie...',
				disabled: this.config.required,
				selected: true
			});
		}

		this.validationMessage = this.config.validationMessage;
		this.refreshItems();
	}

	public refreshItems() {
		this.value = this.items.find(item => item.selected) || this.items[0];
		this.items.sort((a, b) => a.key - b.key);
	}

	public isValid(): boolean {
		if (!this.config.required) {
			return true;
		}

		return this.value.key !== -1;
	}

}
