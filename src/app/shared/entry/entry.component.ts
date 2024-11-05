import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EntryConfig} from '../../models/entry.model';
import {BaseInputComponent} from '../base-input.component';
import {MatDialog} from '@angular/material/dialog';
import {HelpDialogComponent} from '../help-dialog/help-dialog.component';

@Component({
	selector: 'app-entry',
	templateUrl: './entry.component.html',
	styleUrl: './entry.component.css'
})
export class EntryComponent extends BaseInputComponent<EntryConfig> {
	public value: number | null = null;

	constructor(private dialog: MatDialog) {
		super();
	}

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


	openHelpDialog() {
		this.dialog.open(HelpDialogComponent, {
			width: "400px",
			data: {
				help: this.config.help
			},
		});
	}
}
