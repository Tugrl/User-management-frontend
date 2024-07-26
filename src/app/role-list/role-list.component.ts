declare var bootstrap:any;
import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { Role } from '../model/role.model';
import { Authority } from '../model/authority.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RoleListComponent implements OnInit {
  roles: Role[] = [];
  newRoleName: string = '';
  selectedRole: Role | null = null;
  availableAuthorities: Authority[] = [];
  selectedAuthority: string = '';

  constructor(private roleService: RoleService, private router: Router) {}

  ngOnInit() {
    this.getRoles();
    this.getAvailableAuthorities();
  }

  getRoles() {
    this.roleService.getRoles().subscribe((roles: Role[]) => {
      this.roles = roles;
    })
  }

  getAvailableAuthorities() {
    this.roleService.getAuthorities().subscribe((authorities: Authority[]) => {
      this.availableAuthorities = authorities;
    })
  }

  openModal(role: Role) {
    this.selectedRole = role;
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  addRole() {
    if (this.newRoleName.trim()) {
      const newRole: Role = { id: '', name: this.newRoleName, authorities: [] };
      this.roleService.addRole(newRole).subscribe((role: Role) => {
        this.roles.push(role);
        this.newRoleName = '';
      })
    }
  }

  addAuthorityToRoleWithButton(authorityName: string) {
    if (this.selectedRole) {
      this.roleService.addAuthorityToRole(this.selectedRole.id, authorityName).subscribe(
        (updatedRole: Role) => {
        this.selectedRole!.authorities = updatedRole.authorities;
        this.selectedAuthority = '';
      })
    }
  }

  removeAuthorityFromRole(authorityName: string) {
    if (this.selectedRole) {
      this.roleService.removeAuthorityFromRole(this.selectedRole.id, authorityName)
        .subscribe((updatedRole: Role) => {
        this.selectedRole!.authorities = updatedRole.authorities;
      });
    }
  }
}
