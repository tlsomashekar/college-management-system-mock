import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
  <div class="container" style="max-width:420px;margin-top:80px">
    <div class="card">
      <h2 style="margin-top:0">Welcome back</h2>
      <p class="small">Sign in to access the College Management System</p>
      <form [formGroup]="form" (ngSubmit)="submit()" style="margin-top:18px">
        <label>User ID</label>
        <input class="input" formControlName="userId" />
        <div style="height:8px"></div>
        <label>Password</label>
        <input class="input" type="password" formControlName="password" />
        <div style="height:16px"></div>
        <button class="btn btn-primary" [disabled]="form.invalid">Login</button>
      </form>
    </div>
  </div>
  `
})
export class LoginComponent{
  form = this.fb.group({ userId: ['', Validators.required], password: ['', Validators.required] });
  constructor(private fb: FormBuilder, private router: Router) {}
  submit(){
    if(this.form.valid){
      // simple mock auth
      localStorage.setItem('cms_user', this.form.value.userId);
      this.router.navigate(['/dashboard']);
    }
  }
}
