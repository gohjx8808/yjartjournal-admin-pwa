import { DatePipe, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartCardComponent } from './dashboard/chart-card/chart-card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticsCardComponent } from './dashboard/statistics-card/statistics-card.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { AddEditMasterDataDialogComponent } from './master-data/dialogs/add-edit-master-data-dialog/add-edit-master-data-dialog.component';
import { DeleteMasterDataDialogComponent } from './master-data/dialogs/delete-master-data-dialog/delete-master-data-dialog.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { EmptyPipe } from './pipes/empty.pipe';
import { EnlargedImageDialogComponent } from './shared-components/dialogs/enlarged-image-dialog/enlarged-image-dialog.component';
import { FileUploadComponent } from './shared-components/inputs/file/file-upload/file-upload.component';
import { AddEditYarnStockDialogComponent } from './yarn-stock/dialogs/add-edit-yarn-stock-dialog/add-edit-yarn-stock-dialog.component';
import { DeleteYarnStockDialogComponent } from './yarn-stock/dialogs/delete-yarn-stock-dialog/delete-yarn-stock-dialog.component';
import { FilterDialogComponent } from './yarn-stock/dialogs/filter-dialog/filter-dialog.component';
import { YarnStockComponent } from './yarn-stock/yarn-stock.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { MatTableModule } from '@angular/material/table';

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
    DeleteMasterDataDialogComponent,
    FilterDialogComponent,
    EmptyPipe,
    AddEditYarnStockDialogComponent,
    DeleteYarnStockDialogComponent,
    FileUploadComponent,
    EnlargedImageDialogComponent,
    UserManagementComponent,
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
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgOptimizedImage,
    NgChartsModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
