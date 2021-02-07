import { SchoolManagementService } from './../school-management.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {v4 as uuid} from 'uuid';


@Component({
  selector: 'app-add-marks',
  templateUrl: './add-marks.component.html',
  styleUrls: ['./add-marks.component.scss']
})


export class AddMarksComponent implements OnInit {

  myControl = new FormControl();
  studentControl = new FormControl();
  public school_option_value
  public student_option_value
  public uuid

  @ViewChild('schoolInput', {static: true}) inputField : ElementRef
  tempresponse;
  tempresponse_1;
  public school_list;
  public student_list;
  filteredOptions: Observable<any[]>;
  studentOptions: Observable<any[]>;

  constructor(private fb: FormBuilder, public schoolService: SchoolManagementService, public _snackbar: MatSnackBar ) {
    this.myControl = new FormControl();
    this.studentControl = new FormControl()
   }

   studentForm = this.fb.group({
    school_name: ['', [Validators.required]],
    student_name: ['',  [Validators.required]],
    english_marks: ['',  [Validators.required, Validators.maxLength(2), Validators.pattern('^[0-9]*$')]],
    maths_marks: ['',  [Validators.required, Validators.maxLength(2), Validators.pattern('^[0-9]*$')]],
    social_marks:['',  [Validators.required, Validators.maxLength(2), Validators.pattern('^[0-9]*$')]],
    science_marks: ['',  [Validators.required, Validators.maxLength(2), Validators.pattern('^[0-9]*$')]],
    hindi_marks: ['',  [Validators.required, Validators.maxLength(2), Validators.pattern('^[0-9]*$')]]
  });



   ngOnInit() {
     this.getSchool();
  }


  getSchool() {
    this.schoolService.getSchoolNames().subscribe(
      (response) => {

       this.tempresponse = response;
       let list = []
       let school_name;
       this.tempresponse.forEach(element => {
         school_name = element['school_name']

         list.push({
           value : school_name
         })
       });
       this.school_list = list;
       this.filteredOptions = this.myControl.valueChanges.pipe(
         startWith(''),
         map(value => value ? this._filter(value) : this.school_list.slice())

       );


      }


    )
}

_filter(value: string) {
return this.school_list.filter(school =>
school.value.toLowerCase().indexOf(value.toLowerCase()) === 0);
}

_filterStudent(value: string) {
  return this.student_list.filter(student =>
  student.value.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }


getStudent(ev){

  this.school_option_value = ev.option.value;
  if (ev.option.value == 'Hyderabad Public School'){
    this.schoolService.getSchoolHps().subscribe(
      (response) => {
      this.tempresponse_1 = response;
      let list = []
      let student_name;
      this.tempresponse_1.forEach(element => {
        student_name = element['student_name']

        list.push({
          value : student_name
        })

        this.student_list = list
        this.studentOptions = this.studentControl.valueChanges.pipe(
          startWith(''),
          map(value => value ? this._filterStudent(value) : this.student_list.slice())

        );

        console.log(this.studentOptions)
      });
      })
  }

  if(ev.option.value == 'St.Joseph Public School'){
    this.schoolService.getSchoolJoseph().subscribe(
      (response) => {
      this.tempresponse_1 = response;
      let list = []
      let student_name;
      this.tempresponse_1.forEach(element => {
        student_name = element['student_name']

        list.push({
          value : student_name
        })

        this.student_list = list
        this.studentOptions = this.studentControl.valueChanges.pipe(
          startWith(''),
          map(value => value ? this._filterStudent(value) : this.student_list.slice())

        );

        console.log(this.studentOptions)
      });
      })
  }

  if(ev.option.value == 'All Saints High School'){
    this.schoolService.getSchoolSaints().subscribe(
      (response) => {
      this.tempresponse_1 = response;
      let list = []
      let student_name;
      this.tempresponse_1.forEach(element => {
        student_name = element['student_name']

        list.push({
          value : student_name
        })

        this.student_list = list
        this.studentOptions = this.studentControl.valueChanges.pipe(
          startWith(''),
          map(value => value ? this._filterStudent(value) : this.student_list.slice())

        );

        console.log(this.studentOptions)
      });
      })
  }

  if(ev.option.value == 'Oasis International School'){
    this.schoolService.getSchoolOasis().subscribe(
      (response) => {
      this.tempresponse_1 = response;
      let list = []
      let student_name;
      this.tempresponse_1.forEach(element => {
        student_name = element['student_name']

        list.push({
          value : student_name
        })

        this.student_list = list
        this.studentOptions = this.studentControl.valueChanges.pipe(
          startWith(''),
          map(value => value ? this._filterStudent(value) : this.student_list.slice())

        );

        console.log(this.studentOptions)
      });
      })
  }
}

getStudentName(ev){
  this.student_option_value = ev.option.value;
}

openSnackBarSuccess(){
  this._snackbar.open('Form Submitted Successfully', 'End Now', {
    duration: 15000
  })
}

clearForm(){
  this.studentForm.reset()
}

addStudent(){
  let payLoad = this.studentForm.value
  console.log(this.school_option_value)
  console.log(this.studentForm.controls['school_name'].value)
console.log(payLoad)
let payReport = {

    'id' : uuid(),
    'student_name': this.student_option_value,
    'school': this.school_option_value,
    'english_marks': this.studentForm.controls['english_marks'].value,
    'social_marks': this.studentForm.controls['social_marks'].value,
    'maths_marks': this.studentForm.controls['maths_marks'].value,
    'science_marks': this.studentForm.controls['science_marks'].value,
    'hindi_marks': this.studentForm.controls['hindi_marks'].value


}
console.log(payReport)
  this.schoolService.postStudentData(payReport).
  subscribe(
    (success) =>{
      this.openSnackBarSuccess();
    }
  )
}
}
