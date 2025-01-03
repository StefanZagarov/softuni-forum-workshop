import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { emailValidator } from '../../util/email.validator';
import { DOMAINS } from '../../constants';
import { matchPasswordsValidator } from '../../util/match-passwords.validator';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent
{
  // FormGroup expects controls (label-input group)
  form = new FormGroup({
    username: new FormControl(``, [Validators.required, Validators.minLength(5)]),
    email: new FormControl(``, [Validators.required, emailValidator(DOMAINS)]), // Since emailValidator is part of ValidatorFn, it is already part of Validators (i think), so we can import it without problem, DOMAINS is coming from `constants.ts`
    tel: new FormControl(``),

    // Password group form
    passwordGroup: new FormGroup({
      password: new FormControl(``, [Validators.required, Validators.minLength(5)]),
      rePassword: new FormControl(``, [Validators.required]),
    }, {
      validators: [matchPasswordsValidator(`password`, `rePassword`)]
    })
  });

  // Inject user service
  constructor(private userService: UserService, private router: Router) { }

  isNotFilled(controlName: string)
  {
    return this.form.get(controlName)?.touched && this.form.get(controlName)?.errors?.['required'];
  }

  isBelowMinLength(controlName: string)
  {
    return this.form.get(controlName)?.touched && this.form.get(controlName)?.errors?.['minlength'];
  }

  get emailIsNotValid()
  {
    return (this.form.get(`email`)?.touched && this.form.get(`email`)?.errors?.[`emailValidator`]);
  }

  get passwordGroup()
  {
    return this.form.get(`passwordGroup`);
  }

  register()
  {
    if (this.form.invalid) return;

    // Get the form data
    const { username, email, tel, passwordGroup: { password, rePassword } = {} } = this.form.value;

    // Send the data to the user service api
    // We use ! to explicitly tell that it will have those values
    this.userService.register(username!, email!, tel!, password!, rePassword!).subscribe(() =>
    {
      // After successful register, navigate to themes
      this.router.navigate([`/themes`]);
    });
  }
};