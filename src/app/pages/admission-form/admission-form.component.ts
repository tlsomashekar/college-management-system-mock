import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admission-form',
  template: `
  <div class="card">
    <h3>Admission Form</h3>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <div style="display:flex;gap:12px">
        <div style="flex:1">
          <label>Student Name</label>
          <input class="input" formControlName="studentName" />
        </div>
        <div style="flex:1">
          <label>Father Name</label>
          <input class="input" formControlName="fatherName" />
        </div>
      </div>
      <div style="height:12px"></div>
      <div style="display:flex;gap:12px">
        <div style="flex:1">
          <label>Mother Name</label>
          <input class="input" formControlName="motherName" />
        </div>
        <div style="flex:1">
          <label>Contact Number</label>
          <input class="input" formControlName="contact" />
        </div>
      </div>
      <div style="height:12px"></div>
      <label>Previous School</label>
      <input class="input" formControlName="previousSchool" />
      <div style="height:12px"></div>
      <label>Combination</label>
      <select class="input" formControlName="combination">
        <option value="PCMC">PCMC</option>
        <option value="PCMB">PCMB</option>
        <option value="CEBM">CEBM</option>
      </select>
      <div style="height:16px"></div>
      <button class="btn btn-primary" type="submit" [disabled]="form.invalid">Submit</button>
      <button class="btn btn-ghost" type="button" (click)="downloadAll()">Download All Admissions (JSON)</button>
    </form>
  </div>
  `
})
export class AdmissionFormComponent{
  form = this.fb.group({
    studentName: ['', Validators.required],
    fatherName: [''],
    motherName: [''],
    contact: [''],
    previousSchool: [''],
    combination: ['PCMC']
  });
  constructor(private fb: FormBuilder){}
  submit(){
    if(this.form.valid){
      const data = this.getAll();
      const id = 'S' + (data.length + 1).toString().padStart(4,'0');
      const rec = { id, ...this.form.value, created: new Date().toISOString() };
      data.push(rec);
      localStorage.setItem('cms_admissions', JSON.stringify(data));
      alert('Admission saved and PDF (mock) generated');
      this.form.reset({ combination: 'PCMC' });
    }
  }
  getAll(){ return JSON.parse(localStorage.getItem('cms_admissions') || '[]'); }
  downloadAll(){
    const data = this.getAll();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'admissions.json'; a.click(); URL.revokeObjectURL(url);
  }
}
