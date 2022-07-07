export interface MenuInterface {
  path: string
  name: string
  menuId: number
  children?: MenuInterface[]
  component?: string
  redirect?: string
  meta: {
    title: string
    icon?: string
  }
}

export interface MenuTab {
  path: string
  name: string
  label: string
  icon: string
  checked: boolean
  selectKeys: string[]
  openKeys: string[]
}
