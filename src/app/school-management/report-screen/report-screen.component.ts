import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { SchoolManagementService } from './../school-management.service';
import {startWith, map} from 'rxjs/operators';
import * as Chart from 'chart.js';


@Component({
  selector: 'app-report-screen',
  templateUrl: './report-screen.component.html',
  styleUrls: ['./report-screen.component.scss']
})
export class ReportScreenComponent implements OnInit {

  canvas: any;
  ctx: any;
  data = [];
  myControl = new FormControl();

  form: FormGroup;
  tempresponse;
  public student_list;
  filteredOptions: Observable<any[]>;
  public tempresponse_2
  public student_name


  constructor(public fb: FormBuilder, public schoolService: SchoolManagementService) {
    this.myControl = new FormControl();
   }

  ngOnInit() {

    this.getStudent();

    this.form = this.fb.group({
      student: ['']
    });

    this.getChart()

  }

  getStudent() {
       this.schoolService.getStudentList().subscribe(
         (response) => {

          this.tempresponse = response;
          let list = []
          let student_name;
          this.tempresponse.forEach(element => {
            student_name = element['student_name']

            list.push({
              value : student_name
            })
          });
          this.student_list = list;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => value ? this._filter(value) : this.student_list.slice())

          );


          console.log(response, this.filteredOptions);


         }


       )
  }

   _filter(value: string) {
return this.student_list.filter(student =>
  student.value.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }

  displayFn(value?:number){
    return value ? this.student_list.find(_ => _.value === value).value : undefined
  }

  getStudentName(ev){
    this.student_name = ev.option.value
  }

  // Chart
  getChart(){
    this.schoolService.getSchools().subscribe(
      (response) => {
        this.tempresponse_2 = response
        let english_marks, hindi_marks, maths_marks, science_marks, social_marks

        this.tempresponse_2.forEach(element => {

          if(this.student_name == element['student_name']){
            console.log(element)
          english_marks = element['english_marks']
          hindi_marks = element['hindi_marks']
          maths_marks = element['maths_marks']
          science_marks = element['science_marks']
          social_marks = element['social_marks']
          }
        });
        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
        let myChart = new Chart(this.ctx, {
        type: 'bar',
        data: {
          labels: ['English', 'Hindi', 'Maths', 'Science', 'Social'],
          datasets: [{
              label: 'Marks',
              data: [english_marks, hindi_marks, maths_marks, science_marks, social_marks],
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(105, 106, 46, 1)',
                  'rgba(254, 206, 76, 1)',
                  'rgba(353, 324, 56, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
        display:true
      }
    });

      }
    )
  }



}
