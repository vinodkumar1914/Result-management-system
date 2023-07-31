import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-studentresults',
  templateUrl: './studentresults.component.html',
  styleUrls: ['./studentresults.component.css']
})
export class StudentresultsComponent {
  response: any;
  showAddResultForm = false;
  showEditResultForm = false;
  student_id:string=""
  newResult: any = {};
  editResult:any={}

  constructor(private route: ActivatedRoute,private router: Router,private taskservice :TaskService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
     this.response = JSON.parse(params['response']); 
    });
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
}
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  getStudentId(StudentId:string){
    this.student_id=StudentId
  }
  editStudent(studentId:string){
    console.log('Edit button clicked for Student ID:', studentId);
    console.log('data to change:', this.editResult);
    this.taskservice.editResult(studentId,this.editResult).subscribe((res)=>{
        console.log(res)
        this.editResult={}
        studentId=""
        this.showEditResultForm=false
        this.response=res
    },error=>{
      console.log(error)
    })
  }
  deleteStudent(studentId:string){
    console.log("in delete")
    this.taskservice.deleteResult(studentId).subscribe((res)=>{
      console.log("deleted")
      this.response=res
    },error=>{
      console.log(error)
    })
  }
  addStudentResult(){
    console.log("in addition")
    this.taskservice.addResult(this.newResult).subscribe((res)=>{
      this.newResult = {};
      this.showAddResultForm = false;
      this.response=res
    },error=>{
      console.log(error)
    })
  }
}
