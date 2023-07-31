import { Injectable } from '@angular/core';
import { WebrequestserviceService } from './webrequestservice.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  constructor(private webreqser:WebrequestserviceService) { 
  }

  getResult(studentId:string){
    return this.webreqser.get('result/'+studentId);
  }
  getAllResults(){
    return this.webreqser.get('results')
  }
  editResult(studentId:string,data:any){
    return this.webreqser.put('result/'+studentId,data)
  }
  deleteResult(StudentId:string){
    return this.webreqser.delete('result/'+StudentId)
  }
  addResult(data:any){
    return this.webreqser.post('result/',data)
  }
}
