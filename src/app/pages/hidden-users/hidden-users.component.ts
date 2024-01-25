import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, catchError, map, Observable } from 'rxjs';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { TitleService } from '../../services/title.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserDialogComponent } from '../../components/create-user-dialog/create-user-dialog.component';

@Component({
  selector: 'app-hidden-users',
  templateUrl: './hidden-users.component.html',
  styleUrl: './hidden-users.component.scss'
})
export class HiddenUsersComponent {

  users: User[] = [];
  
  displayedColumns: string[] = ['image', 'name', 'surname', 'actions'];
  dataSource = [];
  pageSize: any;
  page: any;
  total_pages: any;
  total: any;

  constructor(
    private readonly userService: UserService,
    private readonly dialog: MatDialog,
    private readonly titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.titleService.title.next('Lista degli utenti nascosti');
    this.getAllDeletedUser();
  }

  getAllDeletedUser(): void{
    this.users = [];
    this.userService.getAll()
      .pipe(
        map((users: User[]) => {
          for(let i = 0; i < users.length; i++){
            if(!users[i].attivo){
              this.users.push(users[i]);
            }
          }
        })
      )
      .subscribe();
  }

}
