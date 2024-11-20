import { Injectable } from '@angular/core';
import {SettingsModel} from '../models/settings.model';
import {environment} from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {

	constructor() {
		// Reserve the space in the localStorage.
		if (localStorage.getItem(environment.localStorageSettingsKey) == null) {
			this.resetSettings();
		}
	}

	public saveSettings(settings: SettingsModel): void {
		let json = JSON.stringify(settings);
		localStorage.setItem(environment.localStorageSettingsKey, json);
	}

	public loadSettings(): SettingsModel {
		let json = localStorage.getItem(environment.localStorageSettingsKey);
		if (json == null) {
			return {}
		}

		return JSON.parse(json) as SettingsModel;
	}

	public resetSettings(): void {
		this.saveSettings({
			colorPrimary: environment.colorConfig.dv.primary,
			colorSecondary: environment.colorConfig.dv.secondary,
			fontSize: environment.fontConfig.defaultFontSize
		});
	}

}
