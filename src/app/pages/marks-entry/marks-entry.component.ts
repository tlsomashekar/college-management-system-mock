import { Component } from '@angular/core';

@Component({
  selector: 'app-marks-entry',
  template: `
  <div class="card">
    <h3>Marks Entry</h3>
    <div style="display:flex;gap:12px;align-items:center;margin-bottom:12px">
      <select class="input" [(ngModel)]="selectedCombination">
        <option value="PCMB">PCMB</option>
        <option value="PCMC">PCMC</option>
        <option value="CEBM">CEBM</option>
      </select>
      <select class="input" [(ngModel)]="selectedExam">
        <option *ngFor="let e of exams">{{e}}</option>
      </select>
      <button class="btn btn-primary" (click)="addStudentRow()">Add Student</button>
      <button class="btn btn-ghost" (click)="generateAllMarksCards()">Generate Marks Cards (JSON)</button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>USN</th><th>Name</th><th *ngFor="let s of subjectList">{{s}}</th><th>Total</th><th>%</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let r of rows; let i=index">
          <td><input class="input" [(ngModel)]="r.usn"></td>
          <td><input class="input" [(ngModel)]="r.name"></td>
          <td *ngFor="let s of subjectList"><input class="input" type="number" [(ngModel)]="r.marks[s]"></td>
          <td>{{total(r)}}</td>
          <td>{{percent(r) | number:'1.0-2'}}</td>
          <td><button class="btn btn-primary" (click)="saveRow(i)">Save</button></td>
        </tr>
      </tbody>
    </table>
  </div>
  `
})
export class MarksEntryComponent{
  exams = JSON.parse(localStorage.getItem('cms_tests') || '["Test 1","Test 2","Midterm","Annual Exam"]');
  selectedCombination = 'PCMB';
  selectedExam = this.exams[0];
  rows: any[] = JSON.parse(localStorage.getItem('cms_marks_rows') || '[]');

  get subjectList(){
    switch(this.selectedCombination){
      case 'PCMB': return ['Physics','Chemistry','Math','Biology','English'];
      case 'PCMC': return ['Physics','Chemistry','Math','Computer','English'];
      case 'CEBM': return ['Civics','Economics','Business','Maths','English'];
      default: return ['Subject1','Subject2'];
    }
  }

  addStudentRow(){
    const marksObj: any = {};
    this.subjectList.forEach(s=>marksObj[s]=0);
    this.rows.push({ usn:'', name:'', marks:marksObj });
  }

  total(r:any){ return Object.values(r.marks).reduce((a:any,b:any)=>a+Number(b||0),0); }
  percent(r:any){ const tot=this.total(r); const max=this.subjectList.length*100; return max? (tot/max)*100 : 0; }

  saveRow(i:number){
    localStorage.setItem('cms_marks_rows', JSON.stringify(this.rows));
    const r = this.rows[i];
    alert(`Saved marks for ${r.name || r.usn} — (mock) sent to WhatsApp`);
  }

  generateAllMarksCards(){
    const payload = this.rows.map(r=>({ usn: r.usn, name: r.name, marks: r.marks, total: this.total(r), percent: this.percent(r) }));
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'marks_cards.json'; a.click(); URL.revokeObjectURL(url);
  }
}
