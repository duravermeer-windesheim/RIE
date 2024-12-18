import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CalculationSetModel} from '../../models/result.model';
import {JsonPipe, NgForOf} from '@angular/common';
import {MAX_RISK_SCORE} from '../../services/risk-calculation.service';

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
	public overviewData: OverviewData[] = [];

	// A reference to the dialog it is in.
	private dialogRef = inject(MatDialogRef<CalculationOverviewDialogComponent>);

	public ngOnInit(): void {
		// Stores the effects the measures have on everything.
		let effects = {
			a: {
				probability: 0,
				effect: 0,
				frequency: 0,
			},
			b: {
				probability: 0,
				effect: 0,
				frequency: 0,
			},
		};

		this.calculationSets.forEach(calculationSet => {
			calculationSet = JSON.parse(JSON.stringify(calculationSet));

			// Find measure values.
			calculationSet.measures.forEach(measure => {
				let measureGroup = measure.riskGroups[calculationSet.riskGroup.key - 1];

				effects.a.effect += measureGroup.scenarioARiskScores.effect;
				effects.b.effect += measureGroup.scenarioBRiskScores.effect;

				effects.a.frequency += measureGroup.scenarioARiskScores.frequency;
				effects.b.frequency += measureGroup.scenarioBRiskScores.frequency;

				effects.a.probability += measureGroup.scenarioARiskScores.probability;
				effects.b.probability += measureGroup.scenarioBRiskScores.probability;
			})

			let effect_a = calculationSet.effect.scenarioA.key;
			let effect_b = calculationSet.effect.scenarioB.key;

			let probability_a = calculationSet.probability.scenarioA.key;
			let probability_b = calculationSet.probability.scenarioB.key;

			let frequency_a = calculationSet.frequency.scenarioA.key;
			let frequency_b = calculationSet.frequency.scenarioB.key;

			let result_a = Math.max(Math.min((
				Math.floor((
					(probability_a + effects.a.probability) *
					(frequency_a + effects.a.frequency) *
					(effect_a + effects.a.effect)) * 100 ) / 100
			), MAX_RISK_SCORE), 0);

			let result_b = Math.max(Math.min((
				Math.floor((
					(probability_b + effects.b.probability) *
					(frequency_b + effects.b.frequency) *
					(effect_b + effects.b.effect)) * 100 ) / 100
			), MAX_RISK_SCORE), 0);

			this.overviewData.push({
				label: "Scenario A - " + calculationSet.riskGroup.value,
				effect: effect_a + (effects.a.effect == 0 ? "" : "(" + this.signNumber(effects.a.effect) + ")" ),
				probability: probability_a + (effects.a.probability == 0 ? "" : "(" + this.signNumber(effects.a.probability) + ")" ),
				frequency: frequency_a + (effects.a.frequency == 0 ? "" : "(" + this.signNumber(effects.a.frequency) + ")" ),
				formula: (probability_a + effects.a.probability) + " × " + (frequency_a + effects.a.frequency) + " × " + (effect_a + effects.a.effect),
				result: result_a + ""
			}, {
				label: "Scenario B - " + calculationSet.riskGroup.value,
				effect: effect_b + (effects.b.effect == 0 ? "" : "(" + this.signNumber(effects.b.effect) + ")" ),
				probability: probability_b + (effects.b.probability == 0 ? "" : "(" + this.signNumber(effects.b.probability) + ")" ),
				frequency: frequency_b + (effects.b.frequency == 0 ? "" : "(" + this.signNumber(effects.b.frequency) + ")" ),
				formula: (probability_b + effects.b.probability) + " × " + (frequency_b + effects.b.frequency) + " × " + (effect_b + effects.b.effect),
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
