import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-easter-egg',
  standalone: true,
	imports: [
		NgIf
	],
  templateUrl: './easter-egg.component.html',
  styleUrl: './easter-egg.component.css'
})
export class EasterEggComponent implements OnInit {

	public toggleOffButtonVisible = false;

	get notStoppedTheEasterEgg() {
		let val = localStorage.getItem("dvrie_easteregg_dismissed");
		return val == null;
	}

	ngOnInit() {
		setInterval(() => {
			this.toggleOffButtonVisible = true;
		}, 5000);
	}

	disable() {
		localStorage.setItem("dvrie_easteregg_dismissed", "true");
	}
}
