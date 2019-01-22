import { Component } from '@angular/core';
import {MatBottomSheetConfig, MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
  color = 'accent';
  mode = 'indeterminate';
  // value = 20;
  message='Please Wait...'
  constructor(private bottomSheetRef: MatBottomSheetRef<LoadingSpinnerComponent, {}>) {
    this.bottomSheetRef
  }
  // constructor() {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
