import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Theme } from '../../types/theme';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-themes-list',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './themes-list.component.html',
  styleUrl: './themes-list.component.css'
})
export class ThemesListComponent implements OnInit
{
  // Create a variable that will hold the data which will be displayed
  themes: Theme[] = [];
  // Data is loading
  isLoading = true;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void
  {
    this.apiService.getThemes().subscribe(themes =>
    {
      this.themes = themes;
      // Data has finished loading
      this.isLoading = false;
    });
  }
}