import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {lastValueFrom} from 'rxjs';
import {RiskScoreGroupCollectionModel, RiskScoreGroupModel} from '../models/risk.model';

@Injectable({
	providedIn: 'root'
})
export class SheetDataService {
	constructor(private http: HttpClient) { }

	private async getSheetData(sheet: string): Promise<[...string[]][]> {
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

	// TODO: This needs a lot of checks. Data is very fragile.
	public async getRiskGroups(sheet: string): Promise<RiskScoreGroupCollectionModel[]> {
		let sheetData = await this.getSheetData(sheet);

		let collections: RiskScoreGroupCollectionModel[] = [];
		let idx = 0;

		let bufferLabel: string = '';
		let bufferGroups: RiskScoreGroupModel[] = [];

		sheetData.slice(1).forEach((record: string[]) => {
			if (idx % 5 == 0) {

				// New object. Store the buffer.
				if (idx != 0) {
					collections.push({
						label: bufferLabel,
						riskGroups: bufferGroups
					});

					// Reset groups for new collection.
					bufferGroups = [];
				}

				// Set the new title to the buffer.
				bufferLabel = record[0];
			} else {
				// Push the record to the buffer.
				bufferGroups.push({
					group: record[0],
					situationARiskScores: {
						probability: parseInt(record[1]),
						frequency: parseInt(record[2]),
						effect: parseInt(record[3]),
					},
					situationBRiskScores: {
						probability: parseInt(record[4]),
						frequency: parseInt(record[5]),
						effect: parseInt(record[6]),
					}
				})
			}

			idx++;
		});

		// Add the last buffer, as it's storage didn't get triggered by a new collection.
		collections.push({
			label: bufferLabel,
			riskGroups: bufferGroups
		});

		return collections;
	}


	public mapRiskGroupsToDropdownItems(risks: RiskScoreGroupCollectionModel[]) {
		return risks.map((risk, index) => ({
			key: index,
			value: risk.label
		}));
	}

}
