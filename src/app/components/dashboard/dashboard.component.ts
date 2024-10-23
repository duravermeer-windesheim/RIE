import {Component, Query, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {EntryComponent} from '../../shared/components/entry/entry.component';
import {EntryConfig} from '../../models/entry.model';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {DropdownComponent} from '../../shared/components/dropdown/dropdown.component';
import {DropdownConfig, DropdownItem} from '../../models/dropdown.model';
import {SharedModule} from '../../shared/shared.module';
import {InfoPanelComponent} from '../info-panel/info-panel.component';
import {EntryPanelComponent} from '../entry-panel/entry-panel.component';
import {ResultPanelComponent} from '../result-panel/result-panel.component';
import {OutputModel} from '../../models/output.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
	imports: [
		NgForOf,
		SharedModule,
		JsonPipe,
		NgIf,
		InfoPanelComponent,
		EntryPanelComponent,
		ResultPanelComponent,
	],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

	@ViewChild(EntryPanelComponent) entryPanel!: EntryPanelComponent;

	getValues(): OutputModel {
		if (this.entryPanel == null) {
			// For the first few milliseconds, an empty object is used because the this.entryPanel isn't populated yet.
			return {} as OutputModel
		}

		return this.entryPanel.getData();
	}
}
