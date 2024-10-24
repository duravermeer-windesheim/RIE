import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EntryConfig} from '../../models/entry.model';
import {BaseInputComponent} from '../base-input.component';

@Component({
	selector: 'app-entry',
	templateUrl: './entry.component.html',
	styleUrl: './entry.component.css'
})
export class EntryComponent extends BaseInputComponent<EntryConfig> {
	public value: number | null = null;

	init() {
		this.value = this.config.defaultValue ?? 0;
		this.validationMessage = this.config.validationMessage;
	}

	// Checks if the value is valid.
	public isValid(): boolean {
		if (this.config.required && this.value == null) {
			this.validationMessage = this.config.validationMessage;
			return false;
		}

		if (this.value != null) {
			if (this.config.max != null && this.value > this.config.max) {
				this.validationMessage = this.config.validationMessage;
				return false;
			}
			if (this.config.min != null && this.value < this.config.min) {
				this.validationMessage = this.config.validationMessage;
				return false;
			}
		} else {
			this.validationMessage = this.config.validationMessage;
			return false;
		}

		return true;
	}


}
