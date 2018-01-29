import { Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ng2-modal';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { DoctorDashboardComponent } from './components/shared/doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './components/shared/patient-dashboard/patient-dashboard.component';
import { AdminDashboardComponent } from './components/shared/admin-dashboard/admin-dashboard.component';
import { SuperadminComponent } from './components/superadmin/superadmin.component';
import { AdminslistComponent } from './components/superadmin/adminslist/adminslist.component';
import { DoctorslistComponent } from './components/superadmin/doctorslist/doctorslist.component';
import { PatientslistComponent } from './components/superadmin/patientslist/patientslist.component';
import { AlluserslistComponent } from './components/superadmin/alluserslist/alluserslist.component';
import { FilterPipe } from './pipes/filter.pipe';
import { AptService } from './services/apt.service';
import { AuthGuard } from './guards/auth.guard';

const appRoutes : Routes = [
  {path:'', component : HomeComponent},
  {path:'register', component : RegisterComponent},
  {path:'login', component : LoginComponent},
  {path:'dashboard', component : DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component : ProfileComponent, canActivate:[AuthGuard]},
  {path: 'doctorDashboard', component : DoctorDashboardComponent, canActivate:[AuthGuard]}, 
  {path: 'patientDashboard', component : PatientDashboardComponent, canActivate:[AuthGuard]},
  {path: 'adminDashboard', component : AdminDashboardComponent, canActivate:[AuthGuard]},
  {path: 'superadmin', component : SuperadminComponent, canActivate:[AuthGuard]},
  {path: 'adminslist', component : AdminslistComponent, canActivate:[AuthGuard]},
  {path: 'doctorslist', component : DoctorslistComponent, canActivate:[AuthGuard]},
  {path: 'patientslist', component : PatientslistComponent, canActivate:[AuthGuard]},
  {path: 'alluserslist', component : AlluserslistComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    DoctorDashboardComponent,
    PatientDashboardComponent,
    AdminDashboardComponent,
    SuperadminComponent,
    AdminslistComponent,
    DoctorslistComponent,
    PatientslistComponent,
    AlluserslistComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    ModalModule
  ],
  providers: [ValidateService, AuthService, AptService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }