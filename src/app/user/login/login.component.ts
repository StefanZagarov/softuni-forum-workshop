import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailDirective } from '../../directives/email.directive';
import { DOMAINS } from '../../constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, EmailDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent
{
  domains = DOMAINS;

  constructor(private userService: UserService, private router: Router) { }

  login(form: NgForm)
  {
    if (form.invalid)
    {
      console.log(`Invalid Login Form!`);
      return;
    }

    // Take the field data from the form
    const { email, password } = form.value;

    // Subscribe to get the data
    // The login user service method returns UserForAuth type data
    this.userService.login(email, password).subscribe(() =>
    {
      // We get the data mainly to know if the login has been successful, if it has been, then redirect to themes
      this.router.navigate([`/themes`]);
    });
  }
}
