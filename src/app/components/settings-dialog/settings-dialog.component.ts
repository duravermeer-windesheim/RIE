import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {ColorService} from '../../services/color.service';
import {FontService} from '../../services/font.service';
import {environment} from '../../../environments/environment';
import {NgIf} from '@angular/common';

@Component({
	selector: 'app-settings-dialog',
	standalone: true,
	imports: [
		MatDialogContent,
		MatDialogActions,
		MatButton,
		NgIf
	],
	templateUrl: './settings-dialog.component.html',
	styleUrl: './settings-dialog.component.css',
	encapsulation: ViewEncapsulation.None
})
export class SettingsDialogComponent implements OnInit {

	// A reference to the dialog it is in.
	private dialogRef = inject(MatDialogRef<SettingsDialogComponent>);

	// current displaying fontSize
	public fontSize: number = environment.fontConfig.defaultFontSize;

	constructor(private colorService: ColorService, private fontService: FontService) {
	}

	public ngOnInit(): void {
		this.fontSize = this.fontService.getFontSize();
	}

	// Getters for if the increment and decrement buttons should be there.
	public get isIncrementButtonVisible(): boolean {
		return this.fontSize < environment.fontConfig.maximumFontSize;
	}
	public get isDecrementButtonVisible(): boolean {
		return this.fontSize > environment.fontConfig.minimumFontSize;
	}

	// Mode:
	// 0 = normal = colorConfig.dv.
	// 1 = black/white = colorConfig.bw.
	// 2 = high contrast = colorConfig.hc.
	public setColorMode(mode: number): void {
		// Default colors.
		let primary, secondary;

		if (mode == 0) {
			primary = environment.colorConfig.dv.primary;
			secondary = environment.colorConfig.dv.secondary;
		} else if (mode == 1) {
			primary = environment.colorConfig.bw.primary;
			secondary = environment.colorConfig.bw.secondary;
		} else {
			primary = environment.colorConfig.hc.primary;
			secondary = environment.colorConfig.hc.secondary;
		}

		this.colorService.changeColor('--color-primary', primary);
		this.colorService.changeColor('--color-secondary', secondary);
	}

	// Increments font size with (used with either 1 or -1).
	public setFontSize(increment: -1 | 1): void {
		this.fontService.incrementFontSize(increment);
		this.fontSize = this.fontService.getFontSize();
	}

	// Resets everything.
	public reset(): void {
		this.setColorMode(0);
		this.fontService.setFontSize(environment.fontConfig.defaultFontSize);
		this.fontSize = this.fontService.getFontSize();
	}

	// Closes the dialog.
	public close(): void {
		this.dialogRef.close();
	}
}
