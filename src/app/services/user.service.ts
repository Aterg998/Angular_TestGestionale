import { Injectable } from '@angular/core';
import { MOCK_USERS } from '../mock/mock-users';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';

export const DEMO_USERS_STORE = 'demo_users_store';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users : User[] = [];
  private url = 'https://reqres.in/';

  constructor(
    private http : HttpClient
  ) { 
    const stored: string | null = localStorage.getItem(DEMO_USERS_STORE);
    this.users = stored ? JSON.parse(stored) : this.save(MOCK_USERS);
  }


  getUsers(pageNum: number){
    return this.http.get(this.url + 'api/users?page=' + pageNum);
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
    this.deleteFromLS();
    this.save(this.users);
    return of(user);
  }

  remove(id: number): Observable<void>{
    const userIndex = this.users.findIndex(user => user.id === id);
    if(userIndex !== -1){
      this.users[userIndex].attivo = false;
      this.deleteFromLS();
      this.save(this.users);
      return of(undefined);
     }
    return throwError("L'id dell'utente non esiste, cancellazione non avvenuta");
   }

enable(id: number): Observable<void>{
  const userIndex = this.users.findIndex(user => user.id === id);
  if(userIndex !== -1){
    this.users[userIndex].attivo = true;
    this.deleteFromLS();
    this.save(this.users);
    return of(undefined);
   }
  return throwError("L'id dell'utente non esiste, cancellazione non avvenuta");
 }

private save(users: User[]): User[] {
localStorage.setItem(DEMO_USERS_STORE, JSON.stringify(users));
return users;
}

private deleteFromLS(){
  localStorage.removeItem(DEMO_USERS_STORE);
}

public getNextId(){
  const users: string | null = localStorage.getItem(DEMO_USERS_STORE);
  if(users){
    let myUsers: User[] = JSON.parse(users);
    let maxId = 0;
    for(let i = 0; i < myUsers?.length; i++){
      if(myUsers[i].id > maxId){
        maxId = myUsers[i].id;
      }
    }
    maxId += 1;
    return maxId;
  }
  return 0;
 }
}
