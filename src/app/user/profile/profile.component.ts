import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../../util/email.validator';
import { DOMAINS } from '../../constants';
import { ProfileDetails } from '../../types/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent
{
  isEditMode: boolean = false;

  profileDetails: ProfileDetails = {
    username: `War`,
    email: `warbeast@gmail.com`,
    tel: `123456`
  };

  form = new FormGroup({
    username: new FormControl(this.profileDetails.username, [Validators.required, Validators.minLength(5)]),
    email: new FormControl(this.profileDetails.email, [Validators.required, emailValidator(DOMAINS)]),
    tel: new FormControl(this.profileDetails.tel, [Validators.required])
  });

  toggleEditMode()
  {
    console.log(this.isEditMode);
    this.isEditMode = !this.isEditMode;
  }

  handleSaveProfile()
  {
    if (this.form.invalid) return;

    // Apply the changes
    this.profileDetails = this.form.value as ProfileDetails; // Cast as ProfileDetails as the form is different class

    // Close the page
    this.toggleEditMode();
  }

  // Toggles the edit mode twice. To stop that we have to prevent the default submit. Also to foolproof the logic I set it to explicitly set the edit mode to false
  onCancel(event: Event)
  {
    event.preventDefault();

    this.isEditMode = false;
  }
}

