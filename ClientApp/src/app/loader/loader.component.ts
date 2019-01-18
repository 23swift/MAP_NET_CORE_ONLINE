import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';
import { MatBottomSheet } from '@angular/material';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  public loading$;

  constructor(private loadingService: LoaderService, private bottomSheet: MatBottomSheet) {
      this.loading$ = this.loadingService.loading$;
  }

  ngOnInit() {
    
  }
}
