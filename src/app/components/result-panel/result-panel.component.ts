import {Component, Input, Output} from '@angular/core';
import {JsonPipe, NgIf} from "@angular/common";
import {OutputModel} from '../../models/output.model';

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
	data!: OutputModel;

}
