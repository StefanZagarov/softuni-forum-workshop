import { Injectable, OnDestroy } from '@angular/core';
import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy
{
  // Behavioral subject for the user
  // It will be initialised as null and will take the UserForAuthentication class when assigned later on
  // We need this so we can use our observable later
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);

  // Multicast the data and return it here
  private user$ = this.user$$.asObservable();

  // Fake user key
  USER_KEY = `[user]`;
  user: UserForAuth | null = null;
  userSubscription: Subscription | null = null;

  // Check if user is logged in
  // `!!` will turn it to truthy or falsy value
  get isLoggedIn(): boolean
  {
    return !!this.user;
  }

  constructor(private http: HttpClient)
  {
    // If we get a user, set it to the Observable
    this.userSubscription = this.user$.subscribe((user) =>
    {
      this.user = user;
    });
  }

  // Similar to login, except we send more things and to /register url
  register(username: string, email: string, tel: string, password: string, rePassword: string)
  {
    return this.http
      .post<UserForAuth>(`/api/register`, { username, email, tel, password, rePassword })
      .pipe(tap(user => this.user$$.next(user)));
  }

  login(email: string, password: string)
  {
    // Make a POST request using a UserForAuth type (model). The interceptor will fill the right (full) address, the email and password are a payload
    // Returns an Observable
    // We put a pipe to listen for the result of the request
    // Tap listens for the data we receive - what we will get from the login api is a user which we will get from the POST request
    // We want to save the user we will get to our BehaviorSubject. We save the user data so we can use it in other places
    return this.http
      .post<UserForAuth>(`/api/login`, { email, password })
      .pipe(tap(user => this.user$$.next(user)));
  }

  logout()
  {
    // Payload required by the method, we send an empty one
    return this.http.post(`/api/logout`, {})
      .pipe(tap(user => this.user$$.next(null))); // We set the user as `null`
  }

  // Get profile data from the SoftUni's back-end API
  getProfile()
  {
    return this.http
      .get<UserForAuth>(`/api/users/profile`)
      .pipe(tap(user => this.user$$.next(user)));
  }

  updateProfile(username: string, email: string, tel?: string)
  {
    return this.http.put<UserForAuth>(`/api/users/profile`, { username, email, tel })
      .pipe(tap(user => this.user$$.next(user))); // the pipe updates the current logged in user data
  }

  // Unsubscribe
  ngOnDestroy(): void
  {
    this.userSubscription?.unsubscribe();
  }
}
