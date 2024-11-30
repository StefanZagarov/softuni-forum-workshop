import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { Theme } from '../../types/theme';
import { UserService } from '../../user/user.service';
import { HomeComponent } from '../../home/home.component';
import { ElapsedTimePipe } from '../../shared/pipes/elapsed-time.pipe';

@Component({
  selector: 'app-current-theme',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './current-theme.component.html',
  styleUrl: './current-theme.component.css'
})
export class CurrentThemeComponent implements OnInit
{
  // Cast a variable - we need an empty for now variable that will be assigned to a value from type Theme, so instead of writing themeData: Theme | null = null, we can cast it
  themeData = {} as Theme;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private userService: UserService) { };

  get isLoggedIn(): boolean
  {
    return this.userService.isLoggedIn;
  };

  get username(): string
  {
    return this.userService.user?.username || ``;
  }

  ngOnInit()
  {
    const themeId = this.route.snapshot.params[`themeId`];

    // Get details for the theme
    this.apiService.getSingleTheme(themeId).subscribe(theme => this.themeData = theme);
  }
}
