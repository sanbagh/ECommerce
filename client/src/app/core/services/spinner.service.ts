import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  constructor(private spinner: NgxSpinnerService) {}

  showSpinner() {
    this.spinner.show(undefined, {
      type: 'timer',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      fullScreen: true,
    });
  }
  hideSpinner() {
    this.spinner.hide();
  }
}
