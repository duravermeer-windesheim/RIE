import { Component } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';

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

}
