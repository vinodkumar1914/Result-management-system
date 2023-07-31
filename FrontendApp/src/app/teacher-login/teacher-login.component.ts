import { Component } from '@angular/core';
import { TaskService } from '../service/task.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})
export class TeacherLoginComponent {
  public userForm:FormGroup;
  teacherId:  string = '';
  password:string='';
  response: any;

  constructor(private taskservice :TaskService,private fb: FormBuilder,private router: Router){
    this.userForm = this.fb.group({
      teacherId: '',
      password:''
    });
  }
  setValue() {
    this.teacherId=this.userForm.get('teacherId')?.value;
    this.password=this.userForm.get('password')?.value;
  }
  getAllResults() {
    this.setValue();
    
    if (this.teacherId === 'admin' && this.password === 'admin') {
        console.log('Login successful!');
        this.taskservice.getAllResults().subscribe((res)=>{
          console.log(res);
          this.response = res;
          this.navigateToResult();
        },error =>{
          console.log(error);
        })
    } else {
        console.log('Invalid login credentials!');
    }
}
navigateToResult() {
  this.router.navigate(['/studentresult'], { queryParams: { response: JSON.stringify(this.response) } });
}
}
