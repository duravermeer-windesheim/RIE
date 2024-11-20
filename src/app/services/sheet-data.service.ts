import {Injectable} from '@angular/core';
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

	public async getRiskGroups(sheet: string): Promise<RiskScoreGroupCollectionModel[]> {
		let sheetData = await this.getSheetData(sheet);

		let collections: RiskScoreGroupCollectionModel[] = [];
		let idx = 0;

		// Buffer values.
		let bufferLabel: string = '';
		let bufferGroups: RiskScoreGroupModel[] = [];

		// For each row in the sheet, except the headers.
		sheetData.slice(1).forEach((record: string[]) => {
			// If it's the start of a new risk.
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
						effect: this.parseScore(record[1]),
						probability: this.parseScore(record[2]),
					},
					situationBRiskScores: {
						effect: this.parseScore(record[3]),
						probability: this.parseScore(record[4]),
					}
				});
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

	private parseScore(score: string) {
		if (!score) {
			return 0;
		}

		let parsed = parseFloat(score.replace(',', '.'));
		return isNaN(parsed) ? 0 : parsed;
	}

	public mapRiskGroupsToDropdownItems(risks: RiskScoreGroupCollectionModel[]) {
		return risks.map((risk, index) => ({
			key: index,
			value: risk.label
		})).sort((a, b) => a.value.localeCompare(b.value));
	}

}
