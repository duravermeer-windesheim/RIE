import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EntryConfig} from '../../../models/entry.model';

@Component({
	selector: 'app-entry',
	templateUrl: './entry.component.html',
	styleUrl: './entry.component.css'
})
export class EntryComponent implements OnInit {

	@Input({required: true})
	public config!: EntryConfig;

	public value: number | null = null;
	public validationMessage?: string;


	ngOnInit() {
		this.value = this.config.defaultValue ?? 0;
		this.validationMessage = this.config.validationMessage;
	}

	// Checks if the value is valid.
	public get isValid(): boolean {
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

	public getValue() {
		return {
			"key": this.config.code,
			"value": this.value
		};
	}

}
