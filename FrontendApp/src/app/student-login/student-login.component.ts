import { Component } from '@angular/core';
import { TaskService } from '../service/task.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent {

  public userForm:FormGroup
  studentId: string = '';
  response: any;
  
  constructor(private taskservice :TaskService,private fb: FormBuilder,private router: Router){
    this.userForm = this.fb.group({
      studentId: ''
    });
  }

  setValue() {
    this.studentId=this.userForm.get('studentId')?.value; 
   
  }

  getResult(){
    this.setValue();
    this.taskservice.getResult(this.studentId).subscribe((res)=>{
      this.response = res;
      console.log("studentid",this.studentId)
      console.log("result ",res);
      this.navigateToResult();
    },error=>{
      console.log(error)
    })
    }
    navigateToResult() {
      this.router.navigate(['/result'], { queryParams: { response: JSON.stringify(this.response) } });
    }
    
  }
