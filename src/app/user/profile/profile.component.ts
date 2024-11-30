import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../../util/email.validator';
import { DOMAINS } from '../../constants';
import { ProfileDetails } from '../../types/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit
{
  constructor(private userService: UserService) { }

  profileDetails: ProfileDetails = {
    username: ``,
    email: ``,
    tel: ``
  };

  ngOnInit(): void
  {
    // Dynamically fill the profile data
    const { username, email, tel } = this.userService.user!;

    this.profileDetails = { username, email, tel: tel! };

    // Set the data to the edit form
    this.form.setValue({
      username, email, tel: tel!
    });
  };

  isEditMode: boolean = false;

  form = new FormGroup({
    username: new FormControl(``, [Validators.required, Validators.minLength(5)]),
    email: new FormControl(``, [Validators.required, emailValidator(DOMAINS)]),
    tel: new FormControl(``, [Validators.required])
  });

  toggleEditMode()
  {
    this.isEditMode = !this.isEditMode;
  }

  handleSaveProfile()
  {
    if (this.form.invalid) return;

    // Apply the changes
    this.profileDetails = this.form.value as ProfileDetails; // Cast as ProfileDetails as the form is different class

    // Destructure the data
    const { username, email, tel } = this.profileDetails;

    // Save the changes
    // `subscribe` - when the request finishes, then we toggle the edit mode
    this.userService.updateProfile(username, email, tel).subscribe(() =>
    {
      // Close the page
      this.toggleEditMode();
    });
  }

  // Toggles the edit mode twice. To stop that we have to prevent the default submit. Also to foolproof the logic I set it to explicitly set the edit mode to false
  onCancel(event: Event)
  {
    event.preventDefault();

    this.isEditMode = false;
  }
}

