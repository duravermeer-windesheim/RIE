import {Component} from '@angular/core';
import {ColorService} from './services/color.service';
import {FontService} from './services/font.service';
import {SettingsService} from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

	constructor(private colorsService: ColorService, private fontService: FontService, private s: SettingsService) {
		colorsService.initializeColors();
		fontService.initializeFont();
	}

}
