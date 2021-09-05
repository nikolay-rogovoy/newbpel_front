import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    title: true,
    name: 'Administration'
  },
  {
    name: 'CMMS',
    url: '/theme/colors',
    icon: 'cil-settings',
    children: [
      { name: 'Certificate CMMS', url: '/cmms/certificate', icon: 'icon-puzzle' },
    ]
  },
  {
    name: 'System settings',
    url: '/theme/colors',
    icon: 'cil-settings',
    children: [
      {
        name: 'Departments',
        url: '/admin/deps',
        icon: 'icon-puzzle'
      }
    ]
  }
];
