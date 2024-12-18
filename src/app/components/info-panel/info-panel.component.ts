import { Component } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {environment} from '../../../environments/environment';

@Component({
	selector: 'app-info-panel',
	standalone: true,
	imports: [
		SharedModule
	],
	templateUrl: './info-panel.component.html',
	styleUrl: './info-panel.component.css'
})
export class InfoPanelComponent {

	public getBankUri(): string {
		return "https://docs.google.com/spreadsheets/d/" + environment.googleSpreadsheet.googleSpreadsheetId + "/edit";
	}

	public getSubstantiationUri(): string {
		return "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
	}
}
