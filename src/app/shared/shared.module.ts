import { NgModule } from '@angular/core';
import {CommonModule, JsonPipe, NgForOf, NgIf} from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import {FormsModule} from '@angular/forms';
import {ClockComponent} from './clock/clock.component';
import {PanelComponent} from './panel/panel.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
	declarations: [
		DropdownComponent,
		ClockComponent,
		PanelComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		NgIf,
		NgIf,
		NgForOf,
		FormsModule,
		JsonPipe,
		MatDialogModule,
	],
	exports: [
		DropdownComponent,
		ClockComponent,
		PanelComponent,
	]
})
export class SharedModule { }
