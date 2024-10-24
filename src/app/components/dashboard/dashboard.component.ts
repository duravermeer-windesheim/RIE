import {Component, ViewChild} from '@angular/core';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {InfoPanelComponent} from '../info-panel/info-panel.component';
import {InputPanelComponent} from '../input-panel/input-panel.component';
import {ResultPanelComponent} from '../result-panel/result-panel.component';
import {ResultModel} from '../../models/result.model';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [
		NgForOf,
		SharedModule,
		JsonPipe,
		NgIf,
		InfoPanelComponent,
		InputPanelComponent,
		ResultPanelComponent,
	],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
	@ViewChild(InputPanelComponent) public inputPanel!: InputPanelComponent;
}
