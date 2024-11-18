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
    const { apiUrl } = environment;

    // Creating dynamic url
    let url = `${apiUrl}/posts`;

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
    const { apiUrl } = environment;

    // Returns `observable` object
    // We expect an array of themes
    return this.http.get<Theme[]>(`${apiUrl}/themes`);
  }

  getSingleTheme(themeId: string)
  {
    const { apiUrl } = environment;

    return this.http.get<Theme>(`${apiUrl}/themes/${themeId}`);
  };

  createTheme(themeName: string, postText: string)
  {
    const { apiUrl } = environment;
    // Payload is an object given when we make POST request
    const payload = { themeName, postText };

    return this.http.post<Theme>(`${apiUrl}/themes`, payload);
  };
}
