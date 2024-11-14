import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css'
})
export class ClockComponent implements AfterViewInit {

	@ViewChild('line') line!: ElementRef;

	@Input({required: true})
	public tick: number = 0;

	@Input()
	public valueVisible: boolean = false;

	@Input()
	public header?: string;

	ngAfterViewInit(): void {
		if (this.tick <= 0 || this.tick > 5) {
			this.rotate();
		} else {
			this.setRotation(((this.tick - 1) * 72) + 2);
		}
	}

	setRotation(degrees: number) {
		this.line.nativeElement.style.transform = 'translate(-100%, -143%) rotate(' + degrees + "deg)";
	}

	rotate() {
		let currentRotation = 0;
		setInterval(() => {
			currentRotation = (currentRotation + 1) % 360;
			this.setRotation(currentRotation);
		}, 10);
	}
}
