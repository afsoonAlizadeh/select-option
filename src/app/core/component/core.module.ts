import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './select/select.component';

@NgModule({
  declarations: [SelectComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [SelectComponent],
})
export class CoreModule {}
