import { ValidatorFn } from "@angular/forms";

export function matchPasswordsValidator(passwordControlName: string, rePasswordControlName: string): ValidatorFn
{
    return (control) =>
    {
        const passwordFormControl = control.get(passwordControlName);
        const rePasswordFormControl = control.get(rePasswordControlName);

        const passwordsAreMatching = passwordFormControl?.value === rePasswordFormControl?.value;

        // If the passwords are matching then return null (nothing will happen), but if the passwords are not matching, then the `matchPasswordsValidator` function will return true so we can get an error
        return passwordsAreMatching ? null : { matchPasswordsValidator: true };
    };
}