import { Component } from '@angular/core';
import { LoaderService } from './loader.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  public loading$ = new BehaviorSubject<boolean>(false);

  constructor(private loadingService: LoaderService) {
    this.loading$ = this.loadingService.loading$;  
  }
}
