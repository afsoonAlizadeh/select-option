import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { PagesModule } from './pages/pages.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
  providers: [HttpClient],

  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    CoreModule,
    PagesModule,
  ],
})
export class AppComponent {
  title = 'select-option';
}
