import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'STORE',
    group: true,
  },
  {
    title:"Categories",
    icon:"nb-tables",
    children:[
      {
        title:"Manage Categories",
        link:"/pages/categories/manage-categories"
      }
    ]
  },
  {
    title:"Books",
    icon:"nb-tables",
    children:[
      {
        title:"Manage Books",
        link:"/pages/books/manage-books"
      },
      {
        title:"Add Book",
        link:"/pages/books/add-book"
      }
    ]
  },
  {
    title: 'Orders',
    icon: 'nb-tables',
    children: [
      {
        title: 'Manage Orders',
        link: '/pages/orders/manage-orders',
      }
    ],
  },
  {
    title: 'Users',
    icon: 'nb-tables',
    children: [
      {
        title: 'Manage Users',
        link: '/pages/users/manage-users',
      },
    ],
  },
  {
    title:"PINs",
    icon:"nb-tables",
    children:[
      {
        title:"Manage PINs",
        link:"/pages/pins/manage-pins"
      }
    ]
  },
  {
    title:"Profile",
    icon:"nb-person",
    children:[
      {
        title:"Change Password",
        link:"/pages/profile/change-password"
      }
    ]
  }
];
