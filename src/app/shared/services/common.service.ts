import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  httpHeaders: any;
  systemToken: any = {};
  browsername: any;


  constructor(private http: HttpClient,private toastr: ToastrService, private fb: FormBuilder) { 

  }

  systemLogin(formData:any) {
    return this.http.post(environment.utilityApiBasePath + 'customer-login', formData);
  }

  // getUserProfile() {
  //   const tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + this.cookieService.get('token') });
  //   return this.http.get(environment.utilityApiBasePath + 'profile', { headers: tokenHeader });
  // }

  // systemLogout() {
  //   const tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + this.cookieService.get('token') });
  //   return this.http.get(environment.utilityApiBasePath + 'logout', { headers: tokenHeader });
  // }

  Get(route: any): Observable<any[]> {
    return this.http.get<any[]>(environment.utilityApiBasePath + route);
  }

  GetById(route: any, id: any): Observable<any[]> {
    return this.http.get<any[]>(environment.utilityApiBasePath + route + '/' + id);
  }

  GetByTwoId(route: any, param1: any, param2: any): Observable<any[]> {
    return this.http.get<any[]>(environment.utilityApiBasePath + route + '/' + param1 + '/' + param2);
  }

  Post(route: any, data: any): Observable<any> {
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const options = {
      headers: httpHeaders
    };
    return this.http.post<any>(environment.utilityApiBasePath + route, data, options);
  }

  Update(route: any, data: any, id: any): Observable<number> {
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const options = {
      headers: httpHeaders
    };
    return this.http.patch<number>(environment.utilityApiBasePath + route + '/' + id, data, options);
  }

  Delete(route: any, id: number): Observable<number> {
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.delete<number>(environment.utilityApiBasePath + route + '/' + id);
  }

 
}
