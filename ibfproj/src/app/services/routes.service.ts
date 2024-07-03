import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  private navbarVisibility = signal<boolean>(false);

  setNavbarVisibility(isVisible: boolean): void {
    this.navbarVisibility.set(isVisible);
  }

  getNavbarVisibility() {
    return this.navbarVisibility;
  }
}
