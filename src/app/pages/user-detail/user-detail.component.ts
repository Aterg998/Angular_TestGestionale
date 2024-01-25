  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { User } from '../../model/user';
  import { catchError, map, switchMap } from 'rxjs/operators';
  import { MOCK_USERS } from '../../mock/mock-users';
import { UserService } from '../../services/user.service';
import { TitleService } from '../../services/title.service';

  @Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrl: './user-detail.component.scss'
  })
  export class UserDetailComponent implements OnInit {

    user?: User;

    constructor(
      private readonly route: ActivatedRoute,
      private readonly router: Router,
      private readonly userService: UserService,
      private readonly titleService: TitleService
      ){}

    ngOnInit(): void {
      this.route.params
      .pipe(
        switchMap(params => this.userService.get(+params['id'])),
        catchError(err => { //se non viene trovato nessun user con id specificato, si torna alla pagina iniziale
          this.router.navigate(['/']);
          alert(err);
          throw err;
        }),
        map((user:User) => {
          this.user = user;
          this.titleService.title.next(`Utente ${this.user.id}`);
        })
        ).subscribe();
    }

delete(user:User):void {
  this.userService.remove(user.id)
  .subscribe(() => {
      console.log(`${user.name} ${user.surname} rimosso!`);
      this.router.navigate(['/']);
    },
    err => console.log(err)
  );}

  goingHome():void {
    this.router.navigate(['/']);
}

enable(user:User):void{
  this.userService.enable(user.id).subscribe(()=>{
    console.log(`${user.name} ${user.surname} rimosso!`);
    this.router.navigate(['/']);
  },
  err => console.error(err));
}

  //   private getUser(id: number): User | undefined {
  //     return MOCK_USERS.find(m => m.id === id);
  // }
  }
