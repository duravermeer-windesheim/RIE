import { Injectable } from '@angular/core';
import {colorConfig, localStorageSettingsKey} from '../config/app.config';
import {SettingsModel} from '../models/settings.model';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {

	constructor() {
		// Reserve the space in the localStorage.
		if (localStorage.getItem(localStorageSettingsKey) == null) {
			this.saveSettings({})
		}
	}

	public saveSettings(settings: SettingsModel) {
		let json = JSON.stringify(settings);
		localStorage.setItem(localStorageSettingsKey, json);
	}

	public loadSettings(): SettingsModel {
		let json = localStorage.getItem(localStorageSettingsKey);
		if (json == null) {
			return {}
		}

		return JSON.parse(json) as SettingsModel;
	}

}
