import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { YarnStockComponent } from './yarn-stock/yarn-stock.component';
import { FooterComponent } from './footer/footer.component';
import { StatisticsCardComponent } from './dashboard/statistics-card/statistics-card.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTreeModule } from '@angular/material/tree';
import { ChartCardComponent } from './dashboard/chart-card/chart-card.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { MatListModule } from '@angular/material/list';
import { AddEditMasterDataDialogComponent } from './master-data/dialogs/add-edit-master-data-dialog/add-edit-master-data-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    YarnStockComponent,
    FooterComponent,
    StatisticsCardComponent,
    ChartCardComponent,
    MasterDataComponent,
    AddEditMasterDataDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTreeModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
