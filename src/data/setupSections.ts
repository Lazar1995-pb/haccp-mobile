export type SetupSection = {
  title: string;
  description: string;
  routeName:
    | 'RestaurantProfile'
    | 'Departments'
    | 'HaccpZones'
    | 'Equipment'
    | 'Suppliers'
    | 'UsersRoles'
    | 'ControlTypes'
    | 'AppSettings';
};

export const setupSections: SetupSection[] = [
  {
    title: 'Restaurant Profile',
    description: 'Set restaurant details, locations, and contact information.',
    routeName: 'RestaurantProfile',
  },
  {
    title: 'Departments',
    description: 'Organize work areas such as kitchen, storage, and service.',
    routeName: 'Departments',
  },
  {
    title: 'HACCP Zones',
    description: 'Define food safety zones for monitoring and controls.',
    routeName: 'HaccpZones',
  },
  {
    title: 'Equipment',
    description: 'Register refrigerators, ovens, sinks, and other assets.',
    routeName: 'Equipment',
  },
  {
    title: 'Suppliers',
    description: 'Manage approved vendors and supplier contact details.',
    routeName: 'Suppliers',
  },
  {
    title: 'Users & Roles',
    description: 'Prepare access levels for managers and team members.',
    routeName: 'UsersRoles',
  },
  {
    title: 'Control Types',
    description: 'Create the checks and controls used across your HACCP plan.',
    routeName: 'ControlTypes',
  },
  {
    title: 'App Settings',
    description: 'Adjust basic preferences for setup and daily use.',
    routeName: 'AppSettings',
  },
];
