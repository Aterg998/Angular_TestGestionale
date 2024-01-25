import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { TitleService } from '../services/title.service';
import { AuthenticationService } from '../services/authentication.service';
import { CreateUserDialogComponent } from '../components/create-user-dialog/create-user-dialog.component';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../model/user';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent  implements OnInit {
title: any;
user?: string;

constructor(
  private readonly titleService: TitleService,
  private readonly ref: ChangeDetectorRef,
  private readonly authService: AuthenticationService,
  private readonly userService: UserService,
  private readonly dialog: MatDialog

) {}

  ngOnInit(): void {
    this.user = this.authService.getAuth()?.username;
    this.titleService.title.pipe(map(title =>{
      this.title = title
      this.ref.detectChanges();
    })).subscribe();
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
