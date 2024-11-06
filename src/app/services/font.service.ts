import { Injectable } from '@angular/core';
import {SettingsService} from './settings.service';
import {defaultFontSize} from '../config/app.config';

@Injectable({
	providedIn: 'root'
})
export class FontService {

	constructor(private settingsService: SettingsService) {
	}

	public initializeFont() {
		// Retrieve current settings.
		let settings = this.settingsService.loadSettings();

		// Apply font (if set).
		if (settings.fontSize)
			this.applyFontSize(settings.fontSize);
	}

	public getFontSize() {
		// Retrieve current settings.
		let settings = this.settingsService.loadSettings();
		return settings.fontSize ?? defaultFontSize
	}

	public incrementFontSize(fontSize: number) {
		// Retrieve current settings.
		let settings = this.settingsService.loadSettings();

		// Apply new font to settings.
		if (settings.fontSize == null) {
			settings.fontSize = defaultFontSize;
		} else {
			settings.fontSize += fontSize;
		}

		// Save updated settings.
		this.settingsService.saveSettings(settings);

		// Apply font size.
		this.applyFontSize(fontSize);
	}

	private applyFontSize(fontSize: number) {
		document.documentElement.style.setProperty('--font-size', fontSize + "px");
	}

}
