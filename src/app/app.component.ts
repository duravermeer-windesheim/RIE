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
		// Initialize custom color and font sizes.
		this.colorsService.initializeColors();
		this.fontService.initializeFont();

		// Check internet connection.
		if (!navigator.onLine) {
			alert("Waarschuwing: Er is geen verbinding met het internet. De website zal waarschijnlijk geen " +
				"verbinding kunnen maken met de databank, en de risico's en maatrelen zullen niet gevuld worden.")
		}

		console.log("+=================================================================================+\n" +
			"|                                                                                 |\n" +
			"|    ____                      __     __                                          |\n" +
			"|   |  _ \\  _   _  _ __  __ _  \\ \\   / /___  _ __  _ __ ___    ___   ___  _ __    |\n" +
			"|   | | | || | | || '__|/ _` |  \\ \\ / // _ \\| '__|| '_ ` _ \\  / _ \\ / _ \\| '__|   |\n" +
			"|   | |_| || |_| || |  | (_| |   \\ V /|  __/| |   | | | | | ||  __/|  __/| |      |\n" +
			"|   |____/  \\__,_||_|   \\__,_|    \\_/  \\___||_|   |_| |_| |_| \\___| \\___||_|      |\n" +
			"|                                                                                 |\n" +
			"+=================================================================================+")
	}
}
