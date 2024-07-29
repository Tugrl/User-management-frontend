import {Component, Inject, OnInit} from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
// @ts-ignore
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
//import {EditUserModalComponent} from "../edit-user-modal/edit-user-modal.component";
import {User} from "../model/user.model";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  currentPage = 0;
  pageSize = 10;
  totalElements = 14;
  searchParams: any = {};
  sortColumn: string = '';
  sortDirection: string = '';
  selectedUser: User = {
    id: '',
    name: '',
    surname: '',
    email: '',
    identityNumber: '',
    salary: 0,
    birthDate: '',
    username: '',
    password: ''
  };
  updates:any = {};

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.getUsersWithPagination();
  }

  getUsersWithPagination() {
    this.userService.getUsersWithPagination(this.currentPage, this.pageSize, this.searchParams).subscribe((data: any) => {
      this.users = data.content;
      this.totalElements = data.totalElements;
    }, error => {
      console.error('Error fetching users', error);
    });
  }

  nextPage() {
    this.currentPage++;
    this.getUsersWithPagination();
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getUsersWithPagination();
    }
  }

  onSearch() {
    this.currentPage = 0;
    this.getUsersWithPagination();
  }
  viewRoles() {
    this.router.navigate(['/role-list']);
  }

  sort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.users.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
      if (this.sortDirection === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  }
  editUser(user: User) {
    this.selectedUser = { ...user };
  }
  saveUser() {
    // Sadece değişen alanları gönder
    if (this.selectedUser.name) {
      this.updates.name = this.selectedUser.name;
    }
    if (this.selectedUser.surname) {
      this.updates.surname = this.selectedUser.surname;
    }
    if (this.selectedUser.email) {
      this.updates.email = this.selectedUser.email;
    }
    if (this.selectedUser.birthDate) {
      this.updates.birthDate = this.selectedUser.birthDate;
    }

    this.userService.updateUserPartial(this.selectedUser.id, this.updates).subscribe(() => {
      this.getUsersWithPagination();
    }, error => {
      console.error('Error updating user', error);
    });
  }
}
