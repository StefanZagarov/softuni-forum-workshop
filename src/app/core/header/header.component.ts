import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent
{
  // Use the UserService to check if there is a logged in user
  get isLoggedIn(): boolean
  {
    return this.userService.isLoggedIn;
  }

  // Use the UserService to get the user object if it exists, and get its first name, otherwise we set it to an empty string
  get username(): string
  {
    return this.userService.user?.username || ``;
  }

  constructor(private userService: UserService, private router: Router) { };

  logout()
  {
    this.userService.logout().subscribe(() =>
    {
      this.router.navigate([`/login`]);
    });
  }
}
