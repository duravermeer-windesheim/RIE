import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialogActions, MatDialogContent} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {colorConfig, defaultFontSize} from '../../config/app.config';
import {ColorService} from '../../services/color.service';
import {FontService} from '../../services/font.service';

@Component({
	selector: 'app-settings-dialog',
	standalone: true,
	imports: [
		MatDialogContent,
		MatDialogActions,
		MatButton
	],
	templateUrl: './settings-dialog.component.html',
	styleUrl: './settings-dialog.component.css',
	encapsulation: ViewEncapsulation.None
})
export class SettingsDialogComponent implements OnInit {

	public fontSize: number = defaultFontSize;

	constructor(private colorService: ColorService, private fontService: FontService) {
	}

	ngOnInit() {
		this.fontSize = this.fontService.getFontSize();
	}

	// Mode:
	// 0 = normal.
	// 1 = black/white.
	// 2 = high contrast.
	setColorMode(mode: number) {
		// Default colors.
		let primary, secondary;

		if (mode == 0) {
			primary = colorConfig.dv.primary;
			secondary = colorConfig.dv.secondary;
		} else if (mode == 1) {
			primary = colorConfig.bw.primary;
			secondary = colorConfig.bw.secondary;
		} else {
			primary = colorConfig.hc.primary;
			secondary = colorConfig.hc.secondary;
		}

		this.colorService.changeColor('--color-primary', primary);
		this.colorService.changeColor('--color-secondary', secondary);
	}

	// Increments font size with (used with either 1 or -1).
	setFontSize(increment: number) {
		this.fontService.incrementFontSize(increment);
		this.fontSize = this.fontService.getFontSize();
	}

	reset() {
		this.setColorMode(0);
	}
}
