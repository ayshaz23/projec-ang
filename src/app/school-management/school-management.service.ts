import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SchoolManagementService {

  constructor(public httpClient: HttpClient) { }

  getSchools() {
    return this.httpClient.get('api/students');
  }

  getSchoolNames() {
    return this.httpClient.get('api/schools');
  }

  getSchoolHps() {
    return this.httpClient.get('api/school_hps');
  }


  getSchoolJoseph() {
    return this.httpClient.get('api/school_joseph');
  }


  getSchoolSaints() {
    return this.httpClient.get('api/school_allsaints');
  }
  getSchoolOasis() {
    return this.httpClient.get('api/school_oasis');
  }


  getStudentList() {
    return this.httpClient.get('api/students_list');
  }

  postStudentData(payLoad){
    return this.httpClient.post('api/students', payLoad)

  }
}
