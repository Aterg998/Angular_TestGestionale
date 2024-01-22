import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../model/user';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.scss'
})
export class CreateUserDialogComponent implements OnInit {

  user: User;

  constructor(
    private readonly ref: MatDialogRef<CreateUserDialogComponent>
  ){
    this.user = {id: new Date().getTime(), name: '', surname: '', age: 0, country:''}
  } //DA CAMBIARE E METTERE UN ID SEQUENZIALE

  ngOnInit(): void {
  }

  close(): void {
    this.ref.close(this.user)
  }

}
