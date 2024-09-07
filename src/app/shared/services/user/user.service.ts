import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap, take } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = './../../assets/fake-data/api/';

  constructor(private http: HttpClient) {}

  fetchUsers(count: number = 20, scroll: number = 1) {
    return new Observable<User[]>((subscriber) => {
      this.http
        .get<User[] | null>(`${this.apiUrl}./user.json`)
        .pipe(map((obj) => obj!.slice(0)))
        .subscribe({
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
