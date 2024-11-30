import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorMsgService
{
  // Used to set the error
  private apiError$$ = new BehaviorSubject(null);

  // Make the api error public via the Observer
  apiError$ = this.apiError$$.asObservable();

  constructor() { }

  setError(error: any): void
  {
    // Push the error
    this.apiError$$.next(error);
  }
}
