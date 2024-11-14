import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SharedModule} from './shared/shared.module';
import {provideHttpClient} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		SharedModule,
		DashboardComponent,
	],
	providers: [
		provideHttpClient(),
  		provideAnimationsAsync()
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
