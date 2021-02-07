import { SchoolManagementService } from './../school-management.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material';
import {Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';


@Component({
  selector: 'app-mark-list',
  templateUrl: './mark-list.component.html',
  styleUrls: ['./mark-list.component.scss']
})
export class MarkListComponent implements OnInit {

  @ViewChild(MatSort, {static: true})
  sort: MatSort
  @ViewChild('filter', {static:true})
  filter: ElementRef

  myControl = new FormControl();
  public tempresponse;
  public student_list;
  public temp_data
  filteredOptions: Observable<any[]>;


  displayedColumns = ['student_name', 'school', 'english_marks', 'hindi_marks', 'maths_marks', 'social_marks', 'science_marks']
  dataSource: MatTableDataSource<any>;



 form: FormGroup

  constructor(public schoolService: SchoolManagementService, public fb: FormBuilder) {
    this.myControl = new FormControl();
  }

  ngOnInit() {
    this.form = this.fb.group({
      student: ['']
    })

    this.schoolService.getSchools().subscribe(
      response => {
        this.temp_data = response;
        this.dataSource = new MatTableDataSource (this.temp_data);
        console.log(this.dataSource)
      }
    )

    this.getStudent()
  }


// Get List of Student in Dropdown
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

        }
      )
 }
// Dropdown Filter
 _filter(value: string) {
  return this.student_list.filter(school =>
  school.value.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }

//Table Filter
  applyFilter(filterValue:string){
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue
  }


}


