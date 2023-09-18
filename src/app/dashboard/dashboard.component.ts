import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private apiService: ApiService) {
    this.apiService
      .getYarnStockOverview()
      .subscribe(data => console.log(data.data));
  }
}
