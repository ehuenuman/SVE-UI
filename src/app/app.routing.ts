﻿import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { StructureComponent } from './structure';
import { SensorComponent } from './sensor';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    //{ path: 'register', component: RegisterComponent },
    { path: 'structure', component: StructureComponent , canActivate: [AuthGuard] },
    //{ path: 'structure/:structure_id', component: StructureComponent , canActivate: [AuthGuard] },
    { path: 'structure/:structure_id', component: StructureComponent , canActivate: [AuthGuard], children: [{ path: 'sensor/:sensor_id', component: SensorComponent}] },
    

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);