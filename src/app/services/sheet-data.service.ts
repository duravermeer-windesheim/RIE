import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {lastValueFrom} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SheetDataService {
	constructor(private http: HttpClient) { }

	public getSheetData(sheet: string) {
		let apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/
			${ environment.googleSpreadsheetId }/values/
			${ sheet }?key=
			${ environment.googleSpreadsheetApiKey}`;

		return lastValueFrom(this.http.get<any>(apiUrl));
	}

}

//
// try {
// 	const result = await this.sheetDataService.getSheetData('Sheet1');
// 	this.data = result.values || [];
// } catch (error) {
// 	this.data = [];
// }
