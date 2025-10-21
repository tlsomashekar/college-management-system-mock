import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  template: `
  <div class="container">
    <div class="header"><h2 class="logo">College CMS</h2><div><button class="btn btn-primary" (click)="logout()">Logout</button></div></div>
    <div class="layout">
      <div class="sidebar card">
        <a class="menu-item" [class.active]="active==='admission'" (click)="go('admission')">Admission Form</a>
        <a class="menu-item" [class.active]="active==='examination'" (click)="go('examination')">Examination</a>
        <a class="menu-item" [class.active]="active==='marks-entry'" (click)="go('marks-entry')">Marks Entry</a>
        <a class="menu-item" [class.active]="active==='tc'" (click)="go('tc')">Transfer Certificate</a>
      </div>
      <div class="main-area" style="flex:1"><router-outlet></router-outlet></div>
    </div>
  </div>
  `
})
export class DashboardComponent{
  active='admission';
  constructor(private router: Router){}
  go(p:string){ this.active=p; this.router.navigate(['/dashboard',p]); }
  logout(){ localStorage.removeItem('cms_user'); this.router.navigate(['/login']); }
}
