import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Authority} from "../model/authority.model";
import {AuthorityService} from "../services/authority.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authority-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './authority-list.component.html',
  styleUrl: './authority-list.component.css'
})
export class AuthorityListComponent implements OnInit{
  authorities: Authority[]=[];
  newAuthorityName: string='';

  constructor(private authorityService: AuthorityService, private router: Router) {
  }
  ngOnInit(): void {
    this.getAuthorities();
  }
  getAuthorities() {
    this.authorityService.getAuthorities().subscribe((authorities:Authority[])=>
    {
      this.authorities=authorities;
    }, error => {
      console.error('Error fetching authorities',error);
      }
      );
  }

  addAuthority() {
    if(this.newAuthorityName.trim()) {
      const newAuthority: Authority={ id: '',name: this.newAuthorityName};
      this.authorityService.addAuthority(newAuthority).subscribe((authority:Authority)=>
      {
        this.authorities.push(authority);
        this.newAuthorityName='';
      }, error => {
        console.error("Error adding new authoirty",error);
        }
        )
    }
  }

}
