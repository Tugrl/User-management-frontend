import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // HttpClientModule eklendi
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule] // HttpClientModule import edildi
})
export class RegistrationComponent {
  registerData = {
    name: '',
    surname: '',
    identityNumber: '',
    birthDate: '',
    salary: 0,
    email: '',
    username: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) { }

  onRegister() {
    this.http.post('http://localhost:8080/api/auth/register', this.registerData).subscribe({
      next: response => {
        console.log("Registration is successful", response);
        this.router.navigate(['/login']);
      },
      error: err => { console.log("Registration failed", err); }
    });
  }
}
