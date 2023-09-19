import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
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
    {
      name: 'Master Data',
      icon: 'database',
      children: [
        { name: 'Yarn Category', icon: 'widgets', route: '/yarn-category' },
        {
          name: 'Yarn Color Category',
          icon: 'palette',
          route: '/yarn-color-category',
        },
      ],
    },
  ];

  currentItem: layout.drawerItem = this.drawerNavItems[0];

  private _transformer = (node: layout.drawerItem, level: number) => {
    return {
      ...node,
      expandable: !!node.children && node.children.length > 0,
      level,
    };
  };

  treeControl = new FlatTreeControl<layout.drawerItemFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    const currentRouteUrl = this.route.snapshot.url.join('/');
    this.dataSource.data = this.drawerNavItems;
    this.currentItem =
      this.drawerNavItems.find(item => item.route?.includes(currentRouteUrl)) ||
      this.drawerNavItems[0];
  }

  onItemsSelected(route: string) {
    this.router.navigate([route]);
  }

  hasChild = (_: number, node: layout.drawerItemFlatNode) => node.expandable;
}
