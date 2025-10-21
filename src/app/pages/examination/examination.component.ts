import { Component } from '@angular/core';

@Component({
  selector: 'app-examination',
  template: `
  <div class="card">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <h3>Examination - Manage Tests</h3>
      <div>
        <input class="input" placeholder="New test name" [(ngModel)]="newTest" />
        <button class="btn btn-primary" (click)="addTest()">Add Test</button>
        <button class="btn btn-ghost" (click)="generateHallTickets()">Generate Hall Tickets (JSON)</button>
      </div>
    </div>
    <div style="margin-top:12px">
      <table class="table card">
        <thead><tr><th>Test Name</th><th>Actions</th></tr></thead>
        <tbody>
          <tr *ngFor="let t of tests">
            <td>{{t}}</td>
            <td><button class="btn btn-ghost" (click)="removeTest(t)">Remove</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `
})
export class ExaminationComponent{
  tests = JSON.parse(localStorage.getItem('cms_tests') || '["Test 1","Test 2","Midterm","Annual Exam"]');
  newTest = '';
  addTest(){ if(this.newTest.trim()){ this.tests.push(this.newTest.trim()); localStorage.setItem('cms_tests', JSON.stringify(this.tests)); this.newTest=''; } }
  removeTest(t:string){ this.tests = this.tests.filter(x=>x!==t); localStorage.setItem('cms_tests', JSON.stringify(this.tests)); }
  generateHallTickets(){
    // Mock: create a JSON with admissions + test info
    const students = JSON.parse(localStorage.getItem('cms_admissions') || '[]');
    const payload = students.map(s=>({ name: s.studentName, id: s.id, combination: s.combination, test: this.tests[0] }));
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'halltickets.json'; a.click(); URL.revokeObjectURL(url);
  }
}
