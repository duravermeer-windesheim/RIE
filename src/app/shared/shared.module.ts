import { NgModule } from '@angular/core';
import {CommonModule, JsonPipe, NgForOf, NgIf} from '@angular/common';
import { EntryComponent } from './entry/entry.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import {FormsModule} from '@angular/forms';

@NgModule({
	declarations: [
		EntryComponent,
		DropdownComponent
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
		DropdownComponent
	]
})
export class SharedModule { }
