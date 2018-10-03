import { NbMenuItem } from '@nebular/theme';
import { Title } from '../../../node_modules/@angular/platform-browser';

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
    title:"Home Page",
    icon:"fa fa-home",
    children:[
      {
        title:"Banner",
        link:"/pages/home/banner"
      },
      {
        title:"Footer Banner",
        link:"/pages/home/footer-banner"
      }
    ]
  },
  {
    title: 'Orders',
    icon: 'fa fa-shopping-cart',
    children: [
      {
        title: 'Manage Orders',
        link: '/pages/orders/manage-orders',
      }
    ],
  },
  {
    title:"Listing",
    icon:"fa fa-book",
    children:[
      {
        title:"Add Book",
        link:"/pages/books/add-book"
      },
      {
        title:"Manage Books",
        link:"/pages/books/manage-books"
      }
    ]
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
    title:"Report",
    icon:"nb-tables",
    children:[
      {
        title:"Transaction report",
        link:"/pages/report-tables/transaction"
      },
      {
        title:"Inventory Management",
        link:"/pages/report-tables/inventory"
      },
      {
        title:"Stock health alert",
        link:"/pages/report-tables/stock"
      }
    ]
  },
  {
    title:"Miscellaneous",
    icon:"fas fa-info",
    children:[
      {
        title:"Manage Users",
        link: '/pages/users/manage-users',
      },
      {
        title:"Manage PINs",
        link:"/pages/pins/manage-pins"
      }
    ]
  },
  {
    title:"Pages",
    icon:"fas fa-file-alt",
    children:[
      {
        title:"About Us",
        link:"/pages/who-we-are/about-us"
      },
      {
        title:"What we do",
        link:"/pages/who-we-are/what-we-do"
      },
      {
        title:"Add FAQ",
        link:"/pages/faq/add-faq"
      },
      {
        title:"Update Advertise with us",
        link:"/pages/ad/update"
      },
      {
        title:"Update become our distributor",
        link:"/pages/distributor/update"
      },
      {
        title:"Update publish with us",
        link:"/pages/publish/update"
      },
      {
        title:"Update sell with us",
        link:"/pages/sell/update"
      },
      {
        title:"Update Report Infringment",
        link:"/pages/report/update"
      },
      {
        title:"Update Terms & Conditions",
        link:"/pages/terms/update-terms"
      },
      {
        title:"Update Privacy Policy",
        link:"/pages/privacy-policy/update-privacy-policy"
      },
      {
        title:"Our Location",
        link:"/pages/contact-us/our-location"
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
