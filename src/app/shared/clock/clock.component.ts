import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css'
})
export class ClockComponent implements AfterViewInit, OnChanges {

	@ViewChild('line') line!: ElementRef;

	@Input({required: true})
	public tick: number = 0;

	@Input()
	public valueVisible: boolean = false;

	@Input()
	public header?: string;

	@Input()
	public rotating: boolean = false;

	ngAfterViewInit(): void {
		if (this.rotating) {
			this.rotate();
			return;
		}

		// Rotate.
		this.setRotation(((this.tick - 1) * 72) + 2, true)
	}

	ngOnChanges() {
		if (!this.line) {
			return;
		}

		this.ngAfterViewInit();
	}

	setRotation(degrees: number, doTransition: boolean) {
		if (doTransition) {
			this.line.nativeElement.style.transition = 'transform 0.3s linear';
		} else {
			this.line.nativeElement.style.transition = 'none';
		}

		this.line.nativeElement.style.transform = 'translate(-100%, -143%) rotate(' + degrees % 360 + "deg)";
	}

	rotateOnce() {
		if (this.tick == 0) {
			return;
		}

		let currentRotation = ((this.tick - 1) * 72) + 2
		for (let i = 0; i < 360; i++) {
			setTimeout(() => {
				currentRotation += 1;
				this.setRotation(currentRotation, false);
			}, i * 2);
		}
	}

	rotate() {
		let currentRotation = 0;
		setInterval(() => {
			currentRotation = (currentRotation + 1) % 360;
			this.setRotation(currentRotation, false);
		}, 10);
	}
}
