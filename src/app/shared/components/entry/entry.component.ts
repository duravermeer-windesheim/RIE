import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Entry} from '../../../models/entry.model';

@Component({
  selector: 'app-entry',
  standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		NgIf,
	],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.css'
})
export class EntryComponent implements OnInit {

	@Input({required: true})
	public config!: Entry;

	@Output()
	onInputChange = new EventEmitter<number>();

	public value: number | null = null;

	ngOnInit() {
		if (this.config.defaultValue != null) {
			this.value = this.config.defaultValue ?? 0;
		}
	}

	get labelCode(): string {
		return this.config.label
			.toLowerCase()
			.trim()
			.replace(/\s+/g, '_');
	}

	get isValid(): boolean {
		if (this.config.required && this.value == null) {
			return false;
		}

		if (this.value != null) {
			if (this.config.max != null && this.value > this.config.max) {
				return false;
			}
			if (this.config.min != null && this.value < this.config.min) {
				return false;
			}
		}

		return true;
	}

	onChange() {
		this.onInputChange.emit(this.value ?? -1);
	}

}
