import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CalculationSetModel, ResultScenarioModel} from '../../models/result.model';
import {JsonPipe, NgForOf} from '@angular/common';

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
		NgForOf,
		JsonPipe
	],
	templateUrl: './calculation-overview-dialog.component.html',
	styleUrl: './calculation-overview-dialog.component.css',
	encapsulation: ViewEncapsulation.None
})
export class CalculationOverviewDialogComponent implements OnInit {

	public calculationSets: CalculationSetModel[] = inject(MAT_DIALOG_DATA).calculationSets;

	public overviewData: OverviewData[] = [
		// { label: "Scenario A - Automobilist", frequency: this.calculation.frequencies.frequencyA.key.toString()},
		// { label: "Scenario A - Omwonende", frequency: this.calculation.frequencies.frequencyA.key.toString()},
		// { label: "Scenario A - VKM Ploeg", frequency: this.calculation.frequencies.frequencyA.key.toString()},
		// { label: "Scenario A - Wegwerker", frequency: this.calculation.frequencies.frequencyA.key.toString()},
		// { label: "Scenario B - Automobilist", frequency: this.calculation.frequencies.frequencyB.key.toString()},
		// { label: "Scenario B - Omwonende", frequency: this.calculation.frequencies.frequencyB.key.toString()},
		// { label: "Scenario B - VKM Ploeg", frequency: this.calculation.frequencies.frequencyB.key.toString()},
		// { label: "Scenario B - Wegwerker", frequency: this.calculation.frequencies.frequencyB.key.toString()},
	];

	// A reference to the dialog it is in.
	private dialogRef = inject(MatDialogRef<CalculationOverviewDialogComponent>);

	public ngOnInit(): void {
		const riskGroupTypes = ["motorist", "residents", "vkm", "roadWorker"];

		// Stores the effects the measures have on everything.
		let effects = {
			effect: {
				a: {motorist: 0, residents: 0, vkm: 0, roadWorker: 0,},
				b: {motorist: 0, residents: 0, vkm: 0, roadWorker: 0,},
			},
			probability: {
				a: {motorist: 0, residents: 0, vkm: 0, roadWorker: 0,},
				b: {motorist: 0, residents: 0, vkm: 0, roadWorker: 0,},
			}
		};

		this.calculationSets.forEach(calculationSet => {
			let effect_a = calculationSet.effect.scenarioA.key;
			let effect_b = calculationSet.effect.scenarioB.key;
			let probability_a = calculationSet.probability.scenarioA.key;
			let probability_b = calculationSet.probability.scenarioB.key;
			let frequency_a = calculationSet.frequency.scenarioA.key;
			let frequency_b = calculationSet.frequency.scenarioB.key;

			let result_a = Math.round(probability_a * frequency_a * effect_a);
			let result_b = Math.round(probability_b * frequency_b * effect_b);

			this.overviewData.push({
				label: "Scenario A - " + calculationSet.riskGroup.value,
				effect: effect_a + "",
				probability: probability_a + "",
				frequency: frequency_a + "",
				formula: probability_a + " x " + frequency_a + " x " + effect_a + " = " + result_a,
				result: result_a + ""
			}, {
				label: "Scenario B - " + calculationSet.riskGroup.value,
				effect: effect_b + "",
				probability: probability_b + "",
				frequency: frequency_b + "",
				formula: probability_b + " x " + frequency_b + " x " + effect_b + " = " + result_b,
				result: result_b + ""
			});
		});
	}

	private signNumber(num: number): string {
		return (num > 0 ? "+" : "") + num;
	}

	// Closes the dialog.
	public close(): void {
		this.dialogRef.close();
	}

}
