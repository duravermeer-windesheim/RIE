import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ValidationService {

	constructor() { }

	public isNumerical(value: string) {
		return !value.includes(" ") && !isNaN(+value);
	}
}
