import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { TitleService } from '../services/title.service';
import { AuthenticationService } from '../services/authentication.service';

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
  private readonly authService: AuthenticationService

) {}
  ngOnInit(): void {
  }

ngOninit(): void {
  this.user = this.authService.getAuth()?.username;
  this.titleService.title
  .pipe(
    map(title => {
      this.title = title;
      this.ref.detectChanges();
    })
  ).subscribe();
}
}
