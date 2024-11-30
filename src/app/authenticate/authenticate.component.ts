// Used for the app initial open loader
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { LoaderComponent } from '../shared/loader/loader.component';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css'
})
export class AuthenticateComponent implements OnInit
{
  // Authentication flag
  isAuthenticated = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void
  {
    // Try to get the user
    this.userService
      .getProfile() // Returns UserForAuth class object
      .subscribe({
        // On `next` we want to call a function which will set the authenticated flag of the user
        next: () =>
        {
          this.isAuthenticated = false;
        },
        error: () =>
        {
          this.isAuthenticated = false;
        },
        complete: () =>
        {
          this.isAuthenticated = false;
        }
      });
  }
}
