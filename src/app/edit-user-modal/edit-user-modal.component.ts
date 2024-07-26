// import { Component, Input } from '@angular/core';
// // @ts-ignore
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { UserService } from '../services/user.service';
// import { User } from '../model/user.model';
// import {FormsModule} from "@angular/forms";
//
// @Component({
//   selector: 'app-edit-user-modal',
//   templateUrl: './edit-user-modal.component.html',
//   standalone: true,
//   imports: [
//     FormsModule
//   ],
//   styleUrls: ['./edit-user-modal.component.css']
// })
// export class EditUserModalComponent {
//   @Input() user!: User;
//
//   constructor(public activeModal: NgbActiveModal, private userService: UserService) {}
//
//   save() {
//     this.userService.updateUser(this.user).subscribe(() => {
//       this.activeModal.close('saved');
//     }, (error: any) => {
//       console.error('Error updating user', error);
//     });
//   }
// }
