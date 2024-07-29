import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  updateUserPartial(id: String,updates: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`,updates)
  }

  getUsersWithPagination(page: number, size: number, searchParams: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    for (const key in searchParams) {
      if (searchParams[key]) {
        params = params.set(key, searchParams[key]);
      }
    }

    return this.http.get(`${this.baseUrl}/search`, { headers, params });
  }
}
