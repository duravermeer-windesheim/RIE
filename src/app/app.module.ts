import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {EntryComponent} from './shared/components/entry/entry.component';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		DashboardComponent,
		EntryComponent
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
