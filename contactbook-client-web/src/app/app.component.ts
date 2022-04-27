import { Component } from '@angular/core';
import { NavigationCancel,
        Event,
        NavigationEnd,
        NavigationError,
        NavigationStart,
        Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'contactbook-client-web';
	constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
	
    }
    if (event instanceof NavigationEnd) {
	
    }
    if (event instanceof NavigationCancel) {
	
    }
    if (event instanceof NavigationError) {
	
    }
  }
}
