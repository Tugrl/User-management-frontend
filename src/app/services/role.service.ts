import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../model/role.model';
import { Authority } from '../model/authority.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = 'http://localhost:8080/api/roles';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}`);
  }

  addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.baseUrl}`, role);
  }

  getAuthorities(): Observable<Authority[]> {
    return this.http.get<Authority[]>(`http://localhost:8080/api/authorities`);
  }

  addAuthorityToRole(roleId: string, authorityName: string): Observable<Role> {
    const payload = { authorityName: authorityName };
    return this.http.post<Role>(`${this.baseUrl}/${roleId}/authorities`, payload);
  }

  removeAuthorityFromRole(roleId: string, authorityName: string):
    Observable<Role> {
    return this.http.delete<Role>
    (`${this.baseUrl}/${roleId}/authorities/${authorityName}`);
  }
}
