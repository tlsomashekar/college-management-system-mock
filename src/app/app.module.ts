import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdmissionFormComponent } from './pages/admission-form/admission-form.component';
import { ExaminationComponent } from './pages/examination/examination.component';
import { MarksEntryComponent } from './pages/marks-entry/marks-entry.component';
import { TcComponent } from './pages/tc/tc.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, AdmissionFormComponent, ExaminationComponent, MarksEntryComponent, TcComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot([
    {path:'login',component:LoginComponent},
    {path:'dashboard',component:DashboardComponent,children:[
      {path:'admission',component:AdmissionFormComponent},
      {path:'examination',component:ExaminationComponent},
      {path:'marks-entry',component:MarksEntryComponent},
      {path:'tc',component:TcComponent},
      {path:'',redirectTo:'admission',pathMatch:'full'}
    ]},
    {path:'',redirectTo:'login',pathMatch:'full'}
  ])],
  bootstrap: [AppComponent]
})
export class AppModule {}
