import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {RiskGroupModel, RiskModel} from '../../models/risk.model';
import {SheetDataService} from '../sheet-data.service';

@Injectable({
	providedIn: 'root'
})
export class SheetRiskService {
	constructor(private sheetDataService: SheetDataService) { }

	public async getSheetData() {
		let sheetData = await this.sheetDataService.getSheetData(environment.sheetNames.risks);

		let risks: RiskModel[] = [];
		let idx = 0;

		let bufferLabel: string = '';
		let bufferGroups: RiskGroupModel[] = [];

		sheetData.slice(1).forEach((record: string[]) => {
			if (idx % 5 == 0) {

				// New object. Store the buffer.
				if (idx != 0) {
					risks.push({
						label: bufferLabel,
						riskGroups: bufferGroups
					});

					// Reset groups for new risk.
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

		// Add the last buffer, as it's storage didn't get triggered by a new risk.
		risks.push({
			label: bufferLabel,
			riskGroups: bufferGroups
		});

		return risks;
	}

}
