declare namespace layout {
  interface drawerItem {
    icon?: string;
    name: string;
    route?: string;
    children?: drawerItem[];
  }

  interface drawerItemFlatNode {
    expandable: boolean;
    name: string;
    level: number;
  }
}
