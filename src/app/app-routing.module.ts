import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { YarnStockComponent } from './yarn-stock/yarn-stock.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canMatch: [authGuard] },
  { path: 'yarn-stock', component: YarnStockComponent, canMatch: [authGuard] },
  {
    path: 'yarn-category',
    component: MasterDataComponent,
    canMatch: [authGuard],
  },
  {
    path: 'yarn-color-category',
    component: MasterDataComponent,
    canMatch: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
