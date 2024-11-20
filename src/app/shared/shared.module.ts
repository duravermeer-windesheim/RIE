import { NgModule } from '@angular/core';
import {CommonModule, JsonPipe, NgForOf, NgIf} from '@angular/common';
import { EntryComponent } from './entry/entry.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import {FormsModule} from '@angular/forms';
import {ClockComponent} from './clock/clock.component';
import {PanelComponent} from './panel/panel.component';
import {HelpDialogComponent} from './help-dialog/help-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
	declarations: [
		EntryComponent,
		DropdownComponent,
		ClockComponent,
		PanelComponent,
		HelpDialogComponent,
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
		EntryComponent,
		DropdownComponent,
		ClockComponent,
		PanelComponent,
		HelpDialogComponent,
	]
})
export class SharedModule { }
