import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { YarnStockComponent } from './yarn-stock/yarn-stock.component';
import { MasterDataComponent } from './master-data/master-data.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'yarn-stock', component: YarnStockComponent },
  { path: 'yarn-category', component: MasterDataComponent },
  { path: 'yarn-color-category', component: MasterDataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
