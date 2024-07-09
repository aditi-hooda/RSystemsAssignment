import { Component , OnInit } from '@angular/core';
import { LoadingIndicatorService } from './../../Services/loading-indicator/loading-indicator.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isLoading = false;

  constructor(private loadingIndicatorService: LoadingIndicatorService) { }

  ngOnInit(): void {
    this.loadingIndicatorService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
}
