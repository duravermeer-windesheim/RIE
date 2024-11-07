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

	getBankUri() {
		return "https://docs.google.com/spreadsheets/d/" + environment.googleSpreadsheet.googleSpreadsheetId + "/edit"
	}
}
