import { KeyValue } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../shared/services/model/user';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  userList: User[] = [];
  selectedValue: KeyValue<string, string> = { key: 'id', value: 'name' };
  searchKey: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  get users(): User[] {
    const key = this.searchKey.trim().toLowerCase();

    return this.userList.filter((user) => {
      return user.name.toLowerCase().includes(key);
    });
  }

  fetchUsers() {
    this.userService.fetchUsers().subscribe((users) => {
      this.userList = users;
    });
  }

  search(e: string) {
    this.searchKey = e;
  }

  takeData() {}
}
