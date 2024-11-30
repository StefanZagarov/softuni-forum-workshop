import { Component, OnInit, signal } from '@angular/core';
import { ErrorMsgService } from './error-msg.service';

@Component({
  selector: 'app-error-msg',
  standalone: true,
  imports: [],
  templateUrl: './error-msg.component.html',
  styleUrl: './error-msg.component.css'
})
export class ErrorMsgComponent implements OnInit
{
  constructor(private errorMsgService: ErrorMsgService) { }

  // Save the error message as a signal to manage its state
  errorMsg = signal(``);

  ngOnInit(): void
  {
    // Subscribe to the error
    this.errorMsgService.apiError$.subscribe((error: any) =>
    {
      this.errorMsg.set(error?.message);
    });
  }
}
