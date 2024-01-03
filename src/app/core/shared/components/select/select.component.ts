import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent {
  @Input() noFocus: boolean = false;
  @Input() spinner: boolean = false;
  @Input() list: any[] = [];

  constructor(private el: ElementRef<HTMLElement>) {}

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
}
