import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './error/error.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AddThemeComponent } from './theme/add-theme/add-theme.component';
import { MainComponent } from './main/main.component';
import { CurrentThemeComponent } from './theme/current-theme/current-theme.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';

export const routes: Routes = [
    // Home Page Redirect
    // 1. If the path is empty, redirect to home
    { path: ``, redirectTo: `/home`, pathMatch: `full` },
    // 2. In order for this to work, we must create a home page path, which will point to the home component
    { path: `home`, component: HomeComponent },

    // User related routes
    { path: `login`, component: LoginComponent },
    { path: `register`, component: RegisterComponent },
    { path: `profile`, component: ProfileComponent },

    // Themes related routes
    {
        path: `themes`, children: [
            { path: ``, component: MainComponent }, // If we have nothing, then navigate to the `main` component. Since we want the themes and posts shown when we click the Themes button, we instead get the `main` component which holds both
            { path: `:themeId`, component: CurrentThemeComponent } // if a themeId is added, then navigate to the details of that theme
        ]
    },
    {
        path: `add-theme`,
        loadComponent: () => import(`./theme/add-theme/add-theme.component`).then(component => component.AddThemeComponent),
        canActivate: [AuthGuard]
    }, // Auth guard for non-logged in users

    // Display error route
    { path: `error`, component: ErrorMsgComponent },

    // Error On Invalid URL
    // 3. We create a link with the path and the component- first we must configure the page and only after that we can redirect to it (because of the wild card)
    { path: `404`, component: PageNotFoundComponent },
    // 4. On any invalid path, redirect to 404 - wildcards must be at the very bottom (otherwise this redirect won't work)
    { path: `**`, redirectTo: `/404` },
];
