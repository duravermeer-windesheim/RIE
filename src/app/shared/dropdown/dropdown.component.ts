import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {defaultDropdownItem, DropdownConfig, DropdownItem} from '../../models/dropdown.model';

@Component({
	selector: 'app-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements OnInit {

	@Input({required: true})
	public value!: DropdownItem;

	@Input({required: true})
	public items!: DropdownItem[];

	@Input({ required: true })
	public config!: DropdownConfig;

	@Input()
	public disabled = false;

	@Input()
	public automaticallySelectFirstItem = false;

	@Output()
	public onValueChange = new EventEmitter<DropdownItem>();

	protected hasInteracted: boolean = false;

	ngOnInit(): void {
		if (this.config.addDefaultEmptyOption) {
			this.items.unshift(defaultDropdownItem);
		}

		this.items.sort((a, b) => a.key - b.key);

		if (this.automaticallySelectFirstItem) {
			this.value = this.items[0];
		}
	}

	public compareByKey(item1: any, item2: any): boolean {
		return item1?.key === item2?.key;
	}

	public isValid(): boolean {
		try {
			if ((!this.config?.required) && this.value.key !== -1) {
				return true;
			}

			return this.value.key !== -1;
		} catch {
			return true;
		}
	}

	public onChange(): void {
		this.onValueChange.emit(this.value);
	}

	public getKeyValue(): {key: string, value: any} {
		return {
			key: this.config.code,
			value: this.value
		};
	}

	public resetInteraction() {
		this.hasInteracted = false;
	}

	protected get displayInvalid(): boolean {
		return this.hasInteracted && !this.isValid();
	}

	protected onInteract(): void {
		this.hasInteracted = true;
	}

}
