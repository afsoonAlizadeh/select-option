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
  userList!: User[];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  get users(): User[] {
    return this.userList;
  }

  fetchUsers() {
    this.userService.fetchUsers().subscribe((users) => {
      this.userList = users;
    });
  }
}
