import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(private router: Router) {}

  drawerNavItems: layout.drawerItem[] = [
    { name: 'Dashboard', icon: 'home', route: '/dashboard' },
  ];

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Route has changed to:', event.url);
      }
    });
  }

  onItemsSelected(route: string) {
    this.router.navigate([route]);
  }
}
