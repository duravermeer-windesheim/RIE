import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {MeasureModel} from '../../models/measure.model';
import {SheetDataService} from '../sheet-data.service';

@Injectable({
	providedIn: 'root'
})
export class SheetMeasureService {
	constructor(private sheetDataService: SheetDataService) { }

	public async getSheetData() {
		let sheetData = await this.sheetDataService.getSheetData(environment.sheetNames.measures);

		let measures: MeasureModel[] = [];

		// Parse all rows into measure objects.
		sheetData.slice(1).forEach((record: string[]) => {
			// Check if the required values were added.
			if (record.length < 2) {
				console.error("Could not parse row, as the required first two columns (# and label) were not present");
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
