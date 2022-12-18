import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public hostUrl = "http://localhost:8100"

  constructor(private http: HttpClient) { 
    
  }

  getUsers(url:any) {
    return this.http.get(url);
  }

  getUsersDetails(url:any) {
    return this.http.get(url);
  }

  addUser(url:any,user: any) {
    return this.http.post(url , user);
  }

  updateUser(url:any,user: any) {
    return this.http.post(url , user);
  }

  addimages(url:any,formdata: any) {
    return this.http.post(url , formdata);
  }

  remove(url:any, data: any) {
    return this.http.post(url , data);
  }
}
