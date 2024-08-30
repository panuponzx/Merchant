import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, map, Subscription, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  private countSubject = new BehaviorSubject<number>(15);
  countdown$ = this.countSubject.asObservable();
  private countdownSubscription: Subscription;

  constructor() {
    this.countdownSubscription = new Subscription();
  }

  startCountdown(duration: number): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }

    this.countdownSubscription = interval(1000)
      .pipe(
        map(time => duration - time),
        takeWhile(timeLeft => timeLeft >= 0)
      )
      .subscribe(timeLeft => this.countSubject.next(timeLeft));
  }

  resetStartCountdown(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
    this.countSubject.next(15);
  }

}
