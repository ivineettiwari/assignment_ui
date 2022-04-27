import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  HeadersHttp: HttpHeaders;
  httpOptions: any; 
  URL_REG_USER = 'register'
  URL_LOGIN_USER = 'login'

  constructor(private http: HttpClient) {
    this.HeadersHttp = new HttpHeaders();
    this.HeadersHttp = this.HeadersHttp.set('Content-Type','application/json');
   }

  async encryptData(reqObj: any) {
    reqObj = CryptoJS.AES.encrypt(JSON.stringify(reqObj), 'dfxgchfsdghsegrdh');
    let encrReqObj = {
      encryHD: reqObj.toString()
    }
    return encrReqObj;
  }

  appendToken(token:any){
    sessionStorage.setItem('token', token);
  }

  registerUser(reqObj:any){
    return this.http.post(environment.BASEURL + this.URL_REG_USER, reqObj , this.httpOptions).pipe(
      map((value:any) => value),
      catchError((error:any) => error.message));
  }

  loginUser(reqObj:any){
    return this.http.post(environment.BASEURL + this.URL_LOGIN_USER, reqObj , this.httpOptions).pipe(
      map((value:any) => value),
      catchError((error:any) => error.message));
  }
}
