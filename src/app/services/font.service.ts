import { Injectable } from '@angular/core';
import {SettingsService} from './settings.service';
import {environment} from '../../environments/environment';

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
		return settings.fontSize ?? environment.fontConfig.defaultFontSize;
	}

	public incrementFontSize(increment: number) {
		let fontSize = this.getFontSize();
		this.setFontSize(fontSize + increment);
	}

	public setFontSize(fontSize: number) {
		// Boundary check.
		if (fontSize < environment.fontConfig.minimumFontSize || fontSize > environment.fontConfig.maximumFontSize) {
			return;
		}

		// Retrieve current settings.
		let settings = this.settingsService.loadSettings();

		// Apply new font to settings.
		settings.fontSize = fontSize;

		// Save updated settings.
		this.settingsService.saveSettings(settings);

		// Apply font size.
		this.applyFontSize(settings.fontSize);
	}

	private applyFontSize(fontSize: number) {
		document.documentElement.style.setProperty('--font-size', fontSize + "px");
	}

}
