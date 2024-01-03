import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = './../../assets/fake-data/api/';

  constructor(private http: HttpClient) {}

  fetchUsers() {
    return new Observable<User[]>((subscriber) => {
      this.http.get<User[] | null>(`${this.apiUrl}./user.json`).subscribe({
        next: (users) => {
          if (!users) {
            subscriber.error();
            subscriber.complete();
            return;
          }
          subscriber.next(users);
          subscriber.complete();
        },
        error: (error) => {
          subscriber.error(error);
          subscriber.complete();
        },
      });
    });
  }
}
