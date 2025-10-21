import { Component } from '@angular/core';
@Component({selector:'app-tc',template:`
<div class="card">
  <h3>Transfer Certificate (TC)</h3>
  <div style="display:flex;gap:12px;align-items:center;margin-bottom:12px">
    <input class="input" placeholder="Student Name" [(ngModel)]="student.name" />
    <input class="input" placeholder="Register No" [(ngModel)]="student.regNo" />
    <button class="btn btn-primary" (click)="generateTc()">Generate TC (JSON)</button>
  </div>
  <div *ngIf="preview" class="card" style="margin-top:12px">
    <h4>TC Preview</h4>
    <p><strong>Name:</strong> {{student.name}}</p>
    <p><strong>Register No:</strong> {{student.regNo}}</p>
    <p><strong>DOB:</strong> {{student.dob || '01-01-2006'}}</p>
    <p><strong>Admission Date:</strong> {{student.admissionDate || '01-06-2022'}}</p>
    <p><strong>Leaving Date:</strong> {{student.leavingDate || '20-03-2025'}}</p>
  </div>
</div>
`})
export class TcComponent{
  student: any = { name:'', regNo:'', dob:'', admissionDate:'', leavingDate:'' };
  preview = false;
  generateTc(){
    this.preview = true;
    const blob = new Blob([JSON.stringify(this.student, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `TC_${this.student.regNo || 'unknown'}.json`; a.click(); URL.revokeObjectURL(url);
  }
}
