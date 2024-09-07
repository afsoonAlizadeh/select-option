import { KeyValue } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent implements OnInit {
  @Input() noFocus: boolean = false;
  @Input() spinner: boolean = false;
  @Input() placeholder: string = 'choose an option';

  initialList: any[] = [];
  @Input() set list(value: any[]) {
    this.initialList = value;
    this.getList;
  }

  @Input() selectedValue!: KeyValue<string, string>;

  @Output() searchChange = new EventEmitter<string>();

  loadMore = 1;
  counter = 20;
  userList: KeyValue<string, string>[] = [];

  scroll = false;
  @Output() scrollChange = new EventEmitter<boolean>();

  isOne = true;
  isChecked = false;

  isSelected: KeyValue<string, string>[] = [];

  constructor() {}

  ngOnInit(): void {}

  @HostBinding('attr.open')
  open = false;

  @HostListener('input') logChange() {
    if ((<HTMLInputElement>event!.target).type != 'checkbox') {
      this.loadMore = 1;
      this.isOne = true;
      this.searchChange.emit((<HTMLInputElement>event!.target).value);
    }

    const selectedUser: KeyValue<string, string> = {
      key: (<HTMLInputElement>event!.target).id!,
      value: (<HTMLInputElement>event!.target).name!,
    };

    if ((<HTMLInputElement>event!.target).checked!) {
      this.isSelected.push(selectedUser);
    } else {
      this.isSelected = this.isSelected.filter(
        (item) => item.key !== selectedUser.key
      );
    }
  }

  currentPosition = window.pageYOffset;
  @HostListener('window:wheel', ['$event']) onScroll(e: any) {
    const total = this.getList.length / this.counter;
    if (
      e.deltaY >= this.currentPosition &&
      this.loadMore <= total &&
      !this.scroll
    ) {
      this.loadMore++;
      this.scroll = true;
      this.scrollChange.emit(this.scroll);
      timer(500).subscribe(() => {
        this.isOne = false;
        this.isChecked = true;
        this.scroll = false;
        e.preventDefault();
      });
    }
  }

  get getList(): { key: any; value: any }[] {
    return this.users;
  }

  get pre() {
    return (this.loadMore - 1) * this.counter;
  }

  get next() {
    return this.counter * this.loadMore;
  }

  get users() {
    if (this.initialList.length === 0) this.userList = [];
    if (this.isOne === true) {
      this.userList = this.filteredUser;
      return this.userList;
    } else {
      if (this.isChecked) {
        this.userList = [...this.userList, ...this.filteredUser];
        this.isChecked = false;
      }
      return this.userList;
    }
  }

  get filteredUser() {
    return this.initialList.slice(this.pre, this.next).map((item) => ({
      key: item[this.selectedValue.key],
      value: item[this.selectedValue.value],
    }));
  }

  get selectUser() {
    if (this.isSelected.length != 0) {
      return this.isSelected.map((v) => v.value);
    }
    return '';
  }

  trackByKey(index: number) {
    return this.users ? this.users[index] : 0;
  }

  toggleOpen() {
    this.open = !this.open;
    this.getList;
  }
}
