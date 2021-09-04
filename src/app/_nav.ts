import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  {
    title: true,
    name: 'Administration'
  },
  {
    name: 'Room settings',
    url: '/theme/colors',
    icon: 'cil-settings',
    children: [
      { name: 'Rooms', url: '/room/rooms', icon: 'icon-puzzle' },
      { name: 'Extrarooms', url: '/room/extrarooms', icon: 'icon-puzzle' },
      { name: 'Bathrobes', url: '/room/bathrobes', icon: 'icon-puzzle' },
      { name: 'Bathroom', url: '/room/bathrooms', icon: 'icon-puzzle' },
      { name: 'Beds', url: '/room/beds', icon: 'icon-puzzle' },
      { name: 'Extrabeds', url: '/room/extrabeds', icon: 'icon-puzzle' },
      { name: 'Fridges', url: '/room/fridges', icon: 'icon-puzzle' },
      { name: 'Hygienekits', url: '/room/hygienekits', icon: 'icon-puzzle' },
      { name: 'Internets', url: '/room/internets', icon: 'icon-puzzle' },
      { name: 'Irons', url: '/room/irons', icon: 'icon-puzzle' },
      { name: 'Kitchens', url: '/room/kitchens', icon: 'icon-puzzle' },
      { name: 'Roomtype', url: '/room/roomtypes', icon: 'icon-puzzle' },
      { name: 'Safe', url: '/room/safes', icon: 'icon-puzzle' },
      { name: 'Tempcontrols', url: '/room/tempcontrols', icon: 'icon-puzzle' },
      { name: 'Tvs', url: '/room/tvs', icon: 'icon-puzzle' },
    ]
  },
  {
    name: 'System settings',
    url: '/theme/colors',
    icon: 'cil-settings',
    children: [
      {
        name: 'Users',
        url: '/admin/users',
        icon: 'icon-puzzle'
      },
      {
        name: 'Role',
        url: '/admin/roles',
        icon: 'icon-puzzle'
      },
      {
        name: 'Departments',
        url: '/admin/deps',
        icon: 'icon-puzzle'
      },
      {
        name: 'Operation',
        url: '/admin/operations',
        icon: 'icon-puzzle'
      },
      {
        name: 'Resource',
        url: '/admin/resources',
        icon: 'icon-puzzle'
      },
    ]
  }
];
