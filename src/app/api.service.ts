import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Post } from './types/post';
import { Theme } from './types/theme';

@Injectable({
  providedIn: 'root'
})
export class ApiService
{
  constructor(private http: HttpClient) { }

  getPosts(limit?: number)
  {

    // Creating dynamic url
    let url = `/api/posts`;

    if (limit)
    {
      url += `?limit=${limit}`;
    }

    // Returns `observable` object
    // We expect an array of posts
    return this.http.get<Post[]>(url);
  }

  getThemes()
  {

    // Returns `observable` object
    // We expect an array of themes
    return this.http.get<Theme[]>(`/api/themes`);
  }

  getSingleTheme(themeId: string)
  {

    return this.http.get<Theme>(`/api/themes/${themeId}`);
  };

  createTheme(themeName: string, postText: string)
  {
    // Payload is an object given when we make POST request
    const payload = { themeName, postText };

    return this.http.post<Theme>(`/api/themes`, payload);
  };
}
