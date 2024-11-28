import {ChangeDetectorRef, Component} from '@angular/core';
import {ColorService} from './services/color.service';
import {FontService} from './services/font.service';
import {fromEvent, mapTo, merge, Observable, of} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {SettingsDialogComponent} from './components/settings-dialog/settings-dialog.component';
import {
	CalculationOverviewDialogComponent
} from './components/calculation-overview-dialog/calculation-overview-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

	constructor(
		private colorsService: ColorService,
		private fontService: FontService)
	{
		// Initialize custom color and font sizes.
		this.colorsService.initializeColors();
		this.fontService.initializeFont();

		// Check internet connection.
		if (!navigator.onLine) {
			alert("Waarschuwing: Er is geen verbinding met het internet. De website zal waarschijnlijk geen " +
				"verbinding kunnen maken met de databank, en de risico's en maatrelen zullen niet gevuld worden.")
		}
	}
}
