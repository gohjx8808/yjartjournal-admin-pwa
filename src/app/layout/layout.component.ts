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

  drawerNavItems: layout.drawerItem[] = [
    { name: 'Dashboard', icon: 'home', route: '/dashboard' },
    { name: 'Yarn Stock', icon: 'inventory', route: '/yarn-stock' },
  ];

  currentItem: layout.drawerItem = this.drawerNavItems[0];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    const currentRouteUrl = this.route.snapshot.url.join('/');
    this.currentItem =
      this.drawerNavItems.find(item => item.route.includes(currentRouteUrl)) ||
      this.drawerNavItems[0];
  }

  onItemsSelected(route: string) {
    this.router.navigate([route]);
  }
}
