import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarkListComponent } from './school-management/mark-list/mark-list.component';
import { AddMarksComponent } from './school-management/add-marks/add-marks.component';
import { ReportScreenComponent } from './school-management/report-screen/report-screen.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'marks-list',
    pathMatch: 'full'
  },
  {
    path: 'marks-list',
    component: MarkListComponent,
  },
  {
    path: 'add-marks',
    component: AddMarksComponent,
  },
  {
    path: 'report-screen',
    component: ReportScreenComponent,
  },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
