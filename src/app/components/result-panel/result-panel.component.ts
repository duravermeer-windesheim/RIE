import {Component, Input} from '@angular/core';
import {JsonPipe, NgIf} from "@angular/common";
import {ResultModel} from '../../models/result.model';

@Component({
	selector: 'app-result-panel',
	standalone: true,
	imports: [
		JsonPipe,
		NgIf
	],
	templateUrl: './result-panel.component.html',
	styleUrl: './result-panel.component.css'
})
export class ResultPanelComponent {

	@Input({required: true})
	data!: ResultModel;

	@Input({required: true})
	allValid!: boolean;

}
