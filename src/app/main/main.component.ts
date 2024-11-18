import { Component } from '@angular/core';
import { PostsListComponent } from "../posts-list/posts-list.component";
import { ThemesListComponent } from "../theme/themes-list/themes-list.component";
import { WelcomeMsgComponent } from "../shared/welcome-msg/welcome-msg.component";
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [PostsListComponent, ThemesListComponent, WelcomeMsgComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent
{
  get isLoggedIn(): boolean
  {
    return this.userService.isLoggedIn;
  }

  constructor(private userService: UserService) { }
}
