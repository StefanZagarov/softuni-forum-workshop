import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { catchError } from 'rxjs';
import { inject } from '@angular/core';
import { ErrorMsgService } from './core/error-msg/error-msg.service';
import { Router } from '@angular/router';

// Get our API URL
const { apiUrl } = environment;
const API = `/api`;

export const appInterceptor: HttpInterceptorFn = (req, next) =>
{
  // If the request URL begins with what we want to intercept
  if (req.url.startsWith(API))
  {
    // Then we want the request to be cloned
    req = req.clone({
      // Here we say what we will clone - we want to clone the url by replacing the API URL (API) with our API URL (apiUrl)
      url: req.url.replace(API, apiUrl),
      // Saves the JSW in the browser's cookies
      withCredentials: true
    });
  }

  // Injectable
  const errorService = inject(ErrorMsgService);
  const router = inject(Router);

  return next(req).pipe(
    catchError(error =>
    {
      // Differentiate between errors of type 401 and every other error
      if (error.status == 401)
      {
        // Navigate to login
        router.navigate([`/login`]);
      }
      else
      {
        // Set the error
        errorService.setError(error);
        // Navigate to error where we will display the error prompt
        router.navigate([`/error`]);
      }

      // Returns an array of errors
      return [error];
    })
  );
};
