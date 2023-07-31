import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebrequestserviceService {
  readonly Root_url;
  constructor(private http:HttpClient) {
    this.Root_url='http://localhost:3000'
   }
  get(uri:string){
    return this.http.get(`${this.Root_url}/${uri}`)
  }
  put(uri:string,data:any){
    const url = `${this.Root_url}/${uri}`;
    return this.http.put(url,data)
  }
  delete(uri:string){
    return this.http.delete(`${this.Root_url}/${uri}`)
  }
  post(uri:string,data:any){
    return this.http.post(`${this.Root_url}/${uri}`,data)
  }
}
