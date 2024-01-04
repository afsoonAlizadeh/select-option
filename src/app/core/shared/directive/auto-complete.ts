import {
  Directive,
  HostBinding,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[autocompleteOff]',
})
export class AutocompleteOffDirective {
  @HostBinding('attr.autocomplete') autoComplete = 'off';

  constructor(private _el: ElementRef) {}
}
