import {Component} from '@angular/core';
import {ColorService} from './services/color.service';
import {FontService} from './services/font.service';

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
		this.colorsService.initializeColors();
		this.fontService.initializeFont();
	}

}
