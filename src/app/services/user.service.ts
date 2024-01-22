import { Injectable } from '@angular/core';
import { MOCK_USERS } from '../mock/mock-users';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../model/user';

export const DEMO_USERS_STORE = 'demo_users_store';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users : User[] = [];

  constructor() { 
    const stored: string | null = localStorage.getItem(DEMO_USERS_STORE);
    this.users = stored ? JSON.parse(stored) : this.save(MOCK_USERS);
  }

  getAll(): Observable<User[]>{
    return of(this.users);
  }

  get(id:number): Observable<User> {
    const user = MOCK_USERS.find(user => user.id === id);
    return user ? of(user) : throwError(`Utente con id ${id} non trovato`);
  }

  add(user:User): Observable<User>{
    this.users.push(user);
    return of(user);
  }

  remove(id:number): Observable<void>{
    const userIndex = this.users.findIndex(user => user.id === id);
    if(userIndex !== -1) {
      this.users.splice(userIndex, 1);
      return of(undefined);
    }
  return throwError(`Errore: user con id ${id} non trovato`);
}

private save(users: User[]): User[] {
localStorage.setItem(DEMO_USERS_STORE, JSON.stringify(users));
return users;
}
}
