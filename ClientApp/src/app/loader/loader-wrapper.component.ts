import { Component, OnInit, Input } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

const defaultConfig = new MatBottomSheetConfig();
@Component({
    selector: 'app-loader-wrapper',
    template: ''
})
export class LoaderWrapperComponent implements OnInit {
    @Input() toggle: string;
    config: MatBottomSheetConfig = {
      hasBackdrop: defaultConfig.hasBackdrop,
      disableClose: true,
      backdropClass: defaultConfig.backdropClass,
      direction: 'ltr'
    };

    constructor(private bottomSheet: MatBottomSheet) {
    }

    ngOnInit() {
        if (this.toggle === 'open') {
            setTimeout(() => { this.bottomSheet.open(LoadingSpinnerComponent, this.config); });
        } else {
            setTimeout(() => { this.bottomSheet.dismiss(); });
        }
    }
}
