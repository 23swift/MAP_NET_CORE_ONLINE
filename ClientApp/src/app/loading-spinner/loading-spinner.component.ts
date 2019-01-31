import { Component } from '@angular/core';
import {MatBottomSheetConfig, MatBottomSheetRef} from '@angular/material';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
  color = 'accent';
  mode = 'indeterminate';
  // value = 20;
  message='Please Wait...';
  loading$;
  errorFlag$;
  constructor(private bottomSheetRef: MatBottomSheetRef<LoadingSpinnerComponent, {}>, private _loaderService: LoaderService) {
    this.loading$ = this._loaderService.loading$;
    this.errorFlag$ = this._loaderService.errorFlag$;
  }
}
