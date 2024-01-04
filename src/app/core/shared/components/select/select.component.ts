import { KeyValue } from '@angular/common';
import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

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

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {}

  @HostBinding('attr.open')
  open = false;

  @HostBinding('attr.spinning')
  public get spinning() {
    return this.spinner;
  }

  @HostListener('keyup.enter')
  onEnter() {
    this.el.nativeElement.click();
  }

  @HostListener('click')
  onClick() {
    if (this.spinner) return;
  }

  get list(): { key: any; value: any }[] {
    return this.initialList.map((item) => ({
      key: item[this.selectedValue.key],
      value: item[this.selectedValue.value],
    }));
  }

  trackByKey(index: number) {
    return this.list ? this.list[index] : 0;
  }

  toggleOpen() {
    debugger;
    this.open = !this.open;
  }
}
