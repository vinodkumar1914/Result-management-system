import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { ResultComponent } from './result/result.component';
import { StudentresultsComponent } from './studentresults/studentresults.component';

const routes: Routes=[
  {
    path:'', component: HomeComponent
  },
  {
    path: 'student-login', component: StudentLoginComponent
  },
  {
    path:'teacher-login',component:TeacherLoginComponent
  },
  { path: 'result', component: ResultComponent },
  { path: 'studentresult', component: StudentresultsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
