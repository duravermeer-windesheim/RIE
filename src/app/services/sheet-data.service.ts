import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {lastValueFrom} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SheetDataService {
	constructor(private http: HttpClient) { }

	public async getSheetData(sheet: string): Promise<[...string[]][]> {
		let apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/
			${ environment.googleSpreadsheet.googleSpreadsheetId }/values/
			${ sheet }?key=
			${ environment.googleSpreadsheet.googleSpreadsheetApiKey}`;

		try {
			return (await lastValueFrom(this.http.get<any>(apiUrl))).values;
		} catch (error) {
			console.error("Could not retrieve data from sheet. Error: ", error);
			return [];
		}
	}

}
