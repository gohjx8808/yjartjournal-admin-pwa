import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  @ViewChild('drawer') drawer!: MatDrawer;

  currentRouteUrl = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.currentRouteUrl = this.route.snapshot.url.join('/');
  }

  drawerNavItems: layout.drawerItem[] = [
    { name: 'Dashboard', icon: 'home', route: '/dashboard' },
    { name: 'Yarn Stock', icon: 'inventory', route: '/yarn-stock' },
  ];

  onItemsSelected(route: string) {
    this.router.navigate([route]);
  }
}
