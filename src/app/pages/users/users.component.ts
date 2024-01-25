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
  displayedColumns: string[] = ['image', 'name', 'surname', 'actions'];
  dataSource = [];
  posts: any;
  pageSize: any;
  page: any;
  total_pages: any;
  total: any;


  constructor(
    private readonly userService: UserService,
    private readonly dialog: MatDialog,
    private readonly titleService: TitleService
  ){
    
  }
  
  ngOnInit(): void {
    this.titleService.title.next('Lista Utenti')
    this.getAllUsers();
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

  getAllUsers(): void{
    this.users = [];
    this.userService.getAll()
      .pipe(
        map((users: User[]) => {
          for(let i = 0; i < users.length; i++){
            if(users[i].attivo){
              this.users.push(users[i]);
            }
          }
        })
      )
      .subscribe();
  }
}
