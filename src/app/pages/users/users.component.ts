import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { MOCK_USERS } from '../../mock/mock-users';
import { UserService } from '../../services/user.service';
import { Observable, map, switchMap } from 'rxjs';
import { CreateUserDialogComponent } from '../../components/create-user-dialog/create-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  
  users: User[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly dialog: MatDialog,
    private readonly titleService: TitleService
  ){
    
  }
  
  ngOnInit(): void {
    this.titleService.title.next('Utenti')
    this.userService.getAll()
    .pipe(
      map((users: User[]) => this.users = users)
    ).subscribe();
  }

  create(): void {
    this.dialog.open(CreateUserDialogComponent)
    .afterClosed()
    .pipe(
      switchMap((user?: User) => user ? this.userService.add(user) : new Observable(sub => sub.complete()))
    )
    .subscribe(
      (user : any) => console.log(`User creato: ${user.id}` )
    );
  }
}
