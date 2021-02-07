import { Marks } from './marks';
import { Injectable } from '@angular/core';
import {Subjects} from './subject';
import {Schools} from './school';
import {Students} from './student';
import {InMemoryDbService, RequestInfo} from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FakeDbService implements InMemoryDbService {

  constructor() { }
  createDb(): any {
    return{
      // Schools
      'schools': Schools.schools,
      'school_hps': Schools.schools_data_hps,
      'school_allsaints': Schools.schools_data_allsaints,
      'school_joseph': Schools.schools_data_joseph,
      'school_oasis': Schools.schools_data_oasis,

      // Students
      'students': Students.students,
      'students_list': Students.student_list,

      // Subject
      'subjects': Subjects.subjects,

      // Marks
      'marks': Marks.marks

    }
  }
}
