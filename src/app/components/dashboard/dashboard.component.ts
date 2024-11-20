import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {InfoPanelComponent} from '../info-panel/info-panel.component';
import {InputPanelComponent} from '../input-panel/input-panel.component';
import {ResultPanelComponent} from '../result-panel/result-panel.component';
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from '@angular/material/dialog';
import {SettingsDialogComponent} from '../settings-dialog/settings-dialog.component';

@Component({
	selector: 'app-dashboard',
	standalone: true,
    imports: [
        NgForOf,
        SharedModule,
        JsonPipe,
        NgIf,
        InfoPanelComponent,
        InputPanelComponent,
        ResultPanelComponent,
        MatIcon,
    ],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {

	@ViewChild(InputPanelComponent)
	public inputPanel?: InputPanelComponent;

	constructor(private cdref: ChangeDetectorRef, private dialog: MatDialog) {}

	public openSettings(): void {
		this.dialog.open(SettingsDialogComponent, {
			width: "500px",
			panelClass: 'settings-dialog-container'
		});
	}

	ngAfterViewInit(): void {
		if (this.inputPanel) {
			this.cdref.detectChanges();
		}
	}
}
