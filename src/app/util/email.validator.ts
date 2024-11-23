import { ValidatorFn } from "@angular/forms";

//  ValidatorFn() - tells it that it is a validation function, it holds `control: AbstractControl` parameter and returns either ValidationError or null
export function emailValidator(domains: string[]): ValidatorFn 
{
    const domainString = domains.join(`|`); // Output: bg | com

    // Should contain alphanumerical symbols, must be at least 6 characters long before the `@`, must be `gmail`, must end on either `bg` or `com`
    const regExp = new RegExp(`[A-Za-z0-9]{6,}@gmail\.(${domainString})`); // [A-Za-z0-9]{6,}@gmail\.(bg|com)

    // Return AbstractControl anonymus function
    // Every time we type in the field, this gets called
    return (control) =>
    {
        // Check if the email field is valid - it is valid only if it is empty or meets the RegEx requirements
        const isInvalid = control.value === `` || regExp.test(control.value);

        // If invalid return null, if not invalid return `emailValidator` with `true`, this will help us to show the error
        return isInvalid ? null : { emailValidator: true };
    };
};