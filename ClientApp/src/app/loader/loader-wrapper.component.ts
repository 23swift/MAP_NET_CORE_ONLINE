import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

const defaultConfig = new MatBottomSheetConfig();
@Component({
    selector: 'app-loader-wrapper',
    template: ''
})
export class LoaderWrapperComponent implements OnInit, OnDestroy {
    config: MatBottomSheetConfig = {
        hasBackdrop: defaultConfig.hasBackdrop,
        disableClose: true,
        backdropClass: defaultConfig.backdropClass,
        direction: 'ltr'
    };

    constructor(private bottomSheet: MatBottomSheet) { }

    ngOnInit() {
        setTimeout(() => { this.bottomSheet.open(LoadingSpinnerComponent, this.config); });
    }

    ngOnDestroy() {
        setTimeout(() => { this.bottomSheet.dismiss(); });
    }
}
