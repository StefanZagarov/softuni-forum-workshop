import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Post } from '../../types/post';
import { LoaderComponent } from "../../shared/loader/loader.component";

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css'
})
// Implement on initialisation
export class PostsListComponent implements OnInit
{
  // Create a variable that will hold the data which will be displayed
  posts: Post[] = [];
  // Data is loading
  isLoading = true;

  constructor(private apiService: ApiService) { }

  // Get the last 5 posts
  ngOnInit(): void
  {
    // Populate the variable
    this.apiService.getPosts(5).subscribe(posts =>
    {
      this.posts = posts;
      // Data has finished loading
      this.isLoading = false;
    });
  }
}
