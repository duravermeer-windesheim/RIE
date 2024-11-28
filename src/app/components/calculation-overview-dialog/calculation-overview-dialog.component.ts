import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CalculationModel, ResultScenarioModel} from '../../models/result.model';
import {NgForOf} from '@angular/common';

interface OverviewData {
	label?: string,
	effect?: string,
	frequency?: string,
	probability?: string,
	formula?: string,
	result?: string
}

@Component({
	selector: 'app-calculation-overview-dialog',
	standalone: true,
	imports: [
		NgForOf
	],
	templateUrl: './calculation-overview-dialog.component.html',
	styleUrl: './calculation-overview-dialog.component.css',
	encapsulation: ViewEncapsulation.None
})
export class CalculationOverviewDialogComponent implements OnInit {

	public calculation: CalculationModel = inject(MAT_DIALOG_DATA).calculation;

	public overviewData: OverviewData[] = [
		{ label: "Scenario A - Automobilist", frequency: this.calculation.frequencies.frequencyA.key.toString()},
		{ label: "Scenario A - Omwonende", frequency: this.calculation.frequencies.frequencyA.key.toString()},
		{ label: "Scenario A - VKM Ploeg", frequency: this.calculation.frequencies.frequencyA.key.toString()},
		{ label: "Scenario A - Wegwerker", frequency: this.calculation.frequencies.frequencyA.key.toString()},
		{ label: "Scenario B - Automobilist", frequency: this.calculation.frequencies.frequencyB.key.toString()},
		{ label: "Scenario B - Omwonende", frequency: this.calculation.frequencies.frequencyB.key.toString()},
		{ label: "Scenario B - VKM Ploeg", frequency: this.calculation.frequencies.frequencyB.key.toString()},
		{ label: "Scenario B - Wegwerker", frequency: this.calculation.frequencies.frequencyB.key.toString()},
	];

	// A reference to the dialog it is in.
	private dialogRef = inject(MatDialogRef<CalculationOverviewDialogComponent>);

	public ngOnInit(): void {
		const riskGroupTypes = ["motorist", "residents", "vkm", "roadWorker"];

		// Stores the effects the measures have on everything.
		let effects = { effect: {
				a: { motorist: 0, residents: 0, vkm: 0, roadWorker: 0, },
				b: { motorist: 0, residents: 0, vkm: 0, roadWorker: 0, },
			},
			probability: {
				a: { motorist: 0, residents: 0, vkm: 0, roadWorker: 0, },
				b: { motorist: 0, residents: 0, vkm: 0, roadWorker: 0, },
			}
		};

		// Go through each of the applied measures, and add them to the list of all effects.
		this.calculation.measures.forEach((measure) => {
			// Do this for each of the risk groups, so you can reuse the code.
			riskGroupTypes.forEach((group, index) => {

				// Typescript doesn't like the assumption the group is a valid key.
				if (group != "motorist" && group != "residents" && group != "vkm" && group != "roadWorker") {
					return;
				}

				effects.effect.a[group] += measure.riskGroups[index].scenarioARiskScores.effect;
				effects.probability.a[group] += measure.riskGroups[index].scenarioARiskScores.probability;

				effects.effect.b[group] += measure.riskGroups[index].scenarioBRiskScores.effect;
				effects.probability.b[group] += measure.riskGroups[index].scenarioBRiskScores.probability;
			})
		});

		for (let i = 0; i <= 7; i++) {
			this.calculateRow(effects, i);
		}
	}

	// This NEEDS refactoring.
	private calculateRow(effects: any, i: number): void {
		const groupKeys = ["motorist", "residents", "vkm", "roadWorker"];
		const groupKey = groupKeys[i % 4];

		let riskgroups = this.calculation.riskType?.riskGroups;
		if (!riskgroups) {
			return;
		}

		let effect = riskgroups[i % 4][i <= 3 ? "scenarioARiskScores" : "scenarioBRiskScores"].effect;
		let prob = riskgroups[i % 4][i <= 3 ? "scenarioARiskScores" : "scenarioBRiskScores"].probability;

		this.overviewData[i].effect = effect + (effects.effect[i <= 3 ? 'a' : 'b'][groupKey] != 0 ? "(" + this.signNumber(effects.effect[i <= 3 ? 'a' : 'b'][groupKey]) + ")" : '');
		this.overviewData[i].probability = prob + (effects.probability[i <= 3 ? 'a' : 'b'][groupKey] != 0 ? "(" + this.signNumber(effects.probability[i <= 3 ? 'a' : 'b'][groupKey]) + ")" : '');

		this.overviewData[i].formula = (effect + effects.effect[i <= 3 ? 'a' : 'b'][groupKey]) + " x " +
			this.calculation.frequencies[i <= 3 ? 'frequencyA' : 'frequencyB'].key + " x " +
			(prob + effects.probability[i <= 3 ? 'a' : 'b'][groupKey]);

		this.overviewData[i].result = ((effect + effects.effect[i <= 3 ? 'a' : 'b'][groupKey]) *
			this.calculation.frequencies[i <= 3 ? 'frequencyA' : 'frequencyB'].key *
			(prob + effects.probability[i <= 3 ? 'a' : 'b'][groupKey])).toString();
	}

	private signNumber(num: number): string {
		return (num > 0 ? "+" : "") + num;
	}

	// Closes the dialog.
	public close(): void {
		this.dialogRef.close();
	}

}
