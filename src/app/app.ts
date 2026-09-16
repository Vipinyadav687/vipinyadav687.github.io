import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio';

@Component({
  imports: [PortfolioComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('my-port');
}
