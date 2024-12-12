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

	public isValid(): boolean {
		if (!this.config.required) {
			return true;
		}

		return this.value.key !== -1;
	}

	public getKeyValue(): {key: string, value: any} {
		return {
			key: this.config.code,
			value: this.value
		};
	}


	protected get displayInvalid(): boolean {
		return this.hasInteracted && !this.isValid();
	}

	protected onInteract(): void {
		this.hasInteracted = true;
	}


}
