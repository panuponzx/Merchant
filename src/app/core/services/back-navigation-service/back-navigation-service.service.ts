import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackNavigationServiceService {
  private backFunction: (() => void) | null = null;

  setBackFunction(fn: () => void): void {
    this.backFunction = fn;
  }

  triggerBack(): void {
    if (this.backFunction) {
      this.backFunction();
    } else {
      console.warn('Back function is not set.');
    }
  }

  clearBackFunction(): void {
    this.backFunction = null;
  }
}
