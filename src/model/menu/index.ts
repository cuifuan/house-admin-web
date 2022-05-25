export interface MenuInterface {
  path: string;
  name: string;
  icon: string;
  menuId: number;
  children?: MenuInterface[];
  component?: string;
  redirect?: string;
}

export interface MenuTab {
  path: string;
  name: string;
  label: string;
  icon: string;
  checked: boolean;
  selectKeys: string[];
  openKeys: string[];
}
