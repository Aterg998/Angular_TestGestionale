import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.scss'
})
export class CreateUserDialogComponent implements OnInit {

  user: User;

  constructor(
    private readonly ref: MatDialogRef<CreateUserDialogComponent>,
    private readonly userService : UserService
  ){
    this.user = {id: this.userService.getNextId() > 0 ? this.userService.getNextId() : new Date().getTime(), name: '', surname: '', age: 0, country:'', imgUrl:'', attivo: true}
  }  


  ngOnInit(): void {
  }

  close(): void {
    this.ref.close(this.user)
  }

}
