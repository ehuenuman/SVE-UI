import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeCL from '@angular/common/locales/es-CL';
registerLocaleData(localeCL, 'es-CL');
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { routing }       from './app.routing';

import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { 
  AlertService, 
  AuthenticationService, 
  UserService,
  StructureService,
} from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { StructureComponent } from './structure/structure.component';
import { SensorComponent } from './sensor/sensor.component';

import { PlotlyModule } from 'angular-plotly.js';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    routing,
    PlotlyModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent ,
    StructureComponent ,
    SensorComponent  
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    StructureService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es-CL'}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }