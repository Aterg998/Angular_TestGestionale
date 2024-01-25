import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiddenUsersComponent } from './hidden-users.component';

describe('HiddenUsersComponent', () => {
  let component: HiddenUsersComponent;
  let fixture: ComponentFixture<HiddenUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HiddenUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HiddenUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
