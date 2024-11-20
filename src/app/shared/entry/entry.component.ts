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

	@Input({required: true})
	public value: number = 0;

	@Input()
	public disabled: boolean = false;

	@Output()
	public onValueChange = new EventEmitter<number>();

	constructor(private dialog: MatDialog) {
		super();
	}

	public init() { }

	// Checks if the value is valid.
	public isValid(): boolean {
		if (this.value != null) {
			if (this.config.max != null && this.value > this.config.max) {
				return false;
			}
			if (this.config.min != null && this.value < this.config.min) {
				return false;
			}
		} else {
			return false;
		}

		return true;
	}


	public openHelpDialog(): void {
		this.dialog.open(HelpDialogComponent, {
			width: "400px",
			data: {
				help: this.config.help
			},
		});
	}

	public onChange(): void {
		this.onValueChange.emit(this.value)
	}
}
