import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { YarnStockComponent } from './yarn-stock/yarn-stock.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'yarn-stock',
    component: YarnStockComponent,
    canActivate: [authGuard],
  },
  {
    path: 'yarn-category',
    component: MasterDataComponent,
    canActivate: [authGuard],
  },
  {
    path: 'yarn-color-category',
    component: MasterDataComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
