import { Injectable } from '@angular/core';
import { UserForAuth } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
  // Fake user key
  USER_KEY = `[user]`;
  user: UserForAuth | null = null;

  // Check if user is logged in
  // !! will turn it to truthy or falsy value
  get isLoggedIn(): boolean
  {
    return !!this.user;
  }

  constructor()
  {
    try
    {
      // Get the user from the local storage, if exists
      const lsUser = localStorage.getItem(this.USER_KEY) || ``;

      this.user = JSON.parse(lsUser);
    } catch (error)
    {
      this.user = null;
      console.log(error);
    }
  }

  login(email: string = "", password: string = "") // Default values are temporary until we learn to submit forms
  {
    this.user = {
      firstName: `War`,
      email: `some.email@gmail.com`,
      phoneNumber: `456-456-456`,
      password: `456456`,
      id: `asdasd`
    };

    // Save the key in the local storage
    localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
  }

  logout()
  {
    this.user = null;

    localStorage.removeItem(this.USER_KEY);
  }
}
