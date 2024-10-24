import { NgModule } from '@angular/core';
import {CommonModule, JsonPipe, NgForOf, NgIf} from '@angular/common';
import { EntryComponent } from './entry/entry.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import {FormsModule} from '@angular/forms';
import {ClockComponent} from './clock/clock.component';

@NgModule({
	declarations: [
		EntryComponent,
		DropdownComponent,
		ClockComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		NgIf,
		NgIf,
		NgForOf,
		FormsModule,
		JsonPipe
	],
	exports: [
		EntryComponent,
		DropdownComponent,
		ClockComponent
	]
})
export class SharedModule { }
