import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Authority} from "../model/authority.model";

@Injectable({
  providedIn:'root'
})

export class AuthorityService{
  private apiUrl='http://localhost:8080/api/authorities';

  constructor(private http:HttpClient) {
  }
  getAuthorities  (): Observable<Authority[]>{
    return this.http.get<Authority[]>(this.apiUrl);
  }
  addAuthority (authority:Authority) : Observable<Authority>{
    return this.http.post<Authority>(this.apiUrl,authority);

  }

}
