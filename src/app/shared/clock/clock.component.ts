import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MAX_RISK_SCORE} from '../../services/risk-calculation.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css'
})
export class ClockComponent implements AfterViewInit, OnChanges {

	@ViewChild('line')
	public line!: ElementRef;

	@Input({required: true})
	public tick: number = 0;

	@Input()
	public valueVisible: boolean = false;

	@Input()
	public header?: string;

	@Input()
	public permanentlyRotating: boolean = false;

	private isCurrentlyRotatingOnce = false;
	public readonly max = MAX_RISK_SCORE;

	public ngAfterViewInit(): void {
		if (this.permanentlyRotating) {
			this.rotate();
			return;
		}

		// Rotate.
		this.setRotation((this.tick * (360 / (this.max + 5))) + 2, true)
	}

	public ngOnChanges(): void {
		if (!this.line) {
			return;
		}

		this.ngAfterViewInit();
	}

	public setRotation(degrees: number, doTransition: boolean): void {
		if (doTransition) {
			this.line.nativeElement.style.transition = 'transform 0.3s linear';
		} else {
			this.line.nativeElement.style.transition = 'none';
		}

		this.line.nativeElement.style.transform = 'translate(-100%, -143%) rotate(' + degrees % 360 + "deg)";
	}

	public rotateOnce(): void {
		if (this.isCurrentlyRotatingOnce || this.permanentlyRotating) {
			return;
		}

		this.isCurrentlyRotatingOnce = true;
		let currentRotation = this.tick * (360 / (this.max + 5)) + 2;
		for (let i = 0; i < 360; i++) {
			setTimeout(() => {
				currentRotation += 1;
				this.setRotation(currentRotation, false);
			}, i * 2);
		}

		// Turn of the flag after the rotating is done.
		setTimeout(() => {
			this.isCurrentlyRotatingOnce = false;
		}, 720)
	}

	public rotate(): void {
		let currentRotation = 0;
		setInterval(() => {
			currentRotation = (currentRotation + 1) % 360;
			this.setRotation(currentRotation, false);
		}, 10);
	}

	public onClockClick($event: MouseEvent): void {
		const target = $event.target as HTMLElement;

		// Check if the target is the clock-circle or its valid inner parts
		if (!target.classList.contains('clock-circle') &&
			!target.classList.contains('clock-inner-circle') &&
			!target.classList.contains('clock-dot')) {
			return;
		}

		this.rotateOnce()
	}
}
