import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {lastValueFrom} from 'rxjs';
import {MeasureModel} from '../models/measure.model';

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

	public async getMeasuresFromSheets() {
		let sheetData = await this.getSheetData(environment.sheetNames.measures);

		let measures: MeasureModel[] = [];

		// Parse all rows into measure objects.
		sheetData.slice(1).forEach((record: string[]) => {
			// Check if the required values were added.
			if (record.length < 2) {
				console.error("Could not pars row, as the required first two columns (# and label) were not present");
				return;
			}

			// Check if the prefered values were added. Append with "0" if not found.
			if (record.length < 5) {
				console.warn("This row Appended '0' to fill up the empty rows. Please fill in 0 in the " +
					"spreadsheet at empty values");

				let originalLength = record.length;

				record.length = 5;
				record.fill("0", originalLength );
			}

			// Parse the values and place them into measure model objects.
			try {
				measures.push({
					code: parseInt(record[0]) || 0,
					label: record[1],
					effect: parseInt(record[2]) || 0,
					frequency: parseInt(record[3]) || 0,
					probability: parseInt(record[4]) || 0,
				});
			} catch (error) {
				console.error("Could not parse measure. Error: ", error);
				return;
			}
		});

			return measures;
	}
}
