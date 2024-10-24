import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DropdownConfig, DropdownItem} from '../../models/dropdown.model';
import {BaseInputComponent} from '../base-input.component';

@Component({
	selector: 'app-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrl: './dropdown.component.css'
})
export class DropdownComponent extends BaseInputComponent<DropdownConfig> {
	public value!: DropdownItem;


	init() {
		if (this.config.addDefaultEmptyOption) {
			this.config.items.unshift({
				key: '-1',
				value: 'Selecteer een optie...',
				disabled: this.config.required,
				selected: true
			})
		}

		this.value = this.config?.items.find(item => item.selected) || this.config?.items[0];
		this.validationMessage = this.config.validationMessage;
	}

	public isValid(): boolean {
		if (!this.config.required) {
			return true;
		}

		return this.value.key !== '-1';
	}



}
