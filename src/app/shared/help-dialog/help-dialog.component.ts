import {Component, inject, Input} from '@angular/core';
import {HelpModel} from '../../models/help.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrl: './help-dialog.component.css'
})
export class HelpDialogComponent {
	public help: HelpModel = inject(MAT_DIALOG_DATA).help;
}
