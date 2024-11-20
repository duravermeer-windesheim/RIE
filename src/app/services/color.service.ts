import { Injectable } from '@angular/core';
import {SettingsService} from './settings.service';

@Injectable({
	providedIn: 'root'
})
export class ColorService {

	constructor(private settingsService: SettingsService) {
	}

	public initializeColors(): void {
		// Retrieve current settings.
		let settings = this.settingsService.loadSettings();

		// Apply primary color (if set).
		if (settings.colorPrimary) {
			this.applyColor('--color-primary', settings.colorPrimary);
		}

		// Apply secondary color (if set).
		if (settings.colorSecondary) {
			this.applyColor('--color-secondary', settings.colorSecondary);
		}
	}

	public changeColor(type: '--color-primary' | '--color-secondary', color: string): void {
		// Retrieve current settings.
		let settings = this.settingsService.loadSettings();

		// Apply new color to settings.
		if (type == '--color-primary') {
			settings.colorPrimary = color;
		} else if (type == '--color-secondary') {
			settings.colorSecondary = color;
		}

		// Save updated settings.
		this.settingsService.saveSettings(settings);

		// Apply color.
		this.applyColor(type, color);
	}

	private applyColor(type: '--color-primary' | '--color-secondary', color: string): void {
		document.documentElement.style.setProperty(type, color);
	}
}
