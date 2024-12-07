import {Component, Input, OnInit} from '@angular/core';
import {DropdownConfig} from '../models/dropdown.model';
import {EntryConfig} from '../models/entry.model';


@Component({
	template: ''
})
export abstract class BaseInputComponent<T extends DropdownConfig | EntryConfig> implements OnInit {

	@Input({ required: true })
	public config!: T;

	protected hasInteracted: boolean = false;
	protected abstract value: any;


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

	public ngOnInit() {
		this.init();
	}

	protected abstract init(): void;
	public abstract isValid(): boolean

}
