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
  @Input() initialList: any[] = [];
  @Input() selectedValue!: KeyValue<string, string>;

  search: string = '';
  @Output() searchChange = new EventEmitter<string>();

  loadMore = 1;
  counter = 20;
  userList: KeyValue<string, string>[] = [];
  isScroll = false;
  isOne = true;
  isChecked = false;

  constructor() {}

  ngOnInit(): void {}

  @HostBinding('attr.open')
  open = false;

  @HostListener('input') logChange() {
    this.searchChange.emit(this.search);
  }

  currentPosition = window.pageYOffset;
  @HostListener('window:wheel', ['$event']) onScroll(e: any) {
    const total = this.initialList.length / 20;
    if (
      e.deltaY >= this.currentPosition &&
      this.loadMore <= total &&
      !this.isScroll
    ) {
      this.loadMore++;
      this.isScroll = true;
      timer(500).subscribe(() => {
        this.isOne = false;
        this.isChecked = true;
        this.isScroll = false;
        e.preventDefault();
      });
    }
  }

  get list(): { key: any; value: any }[] {
    return this.users;
  }

  get pre() {
    return (this.loadMore - 1) * this.counter;
  }

  get next() {
    return this.counter * this.loadMore;
  }

  get users() {
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

  trackByKey(index: number) {
    return this.users ? this.users[index] : 0;
  }

  toggleOpen() {
    this.open = !this.open;
    this.list;
  }
}
