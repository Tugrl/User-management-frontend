import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  onLogin() {
    const loginData = { username: this.username, password: this.password };
    this.http.post('http://localhost:8080/api/auth/login', loginData)
      .subscribe(response => {
        // @ts-ignore
        localStorage.setItem('token', response['jwt']);
        this.router.navigate(['/user-list']);
        console.log(loginData);
        console.log('Login successful', response);
      }, error => {
        console.error('Login failed', error);
      });
  }
}
