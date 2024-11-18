import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "../user/user.service";
import { inject } from "@angular/core";

export const AuthGuard: CanActivateFn = () =>
{
    // Inject the user service
    const userService = inject(UserService);
    const router = inject(Router);

    // Check if user is logged in and if not - redirect to the home page
    if (userService.isLoggedIn)
    {
        return true;
    }
    router.navigate(['/home']);

    return false;
};