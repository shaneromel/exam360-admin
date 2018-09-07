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
    title:"Books",
    icon:"fa fa-book",
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
    icon: 'fa fa-shopping-cart',
    children: [
      {
        title: 'Manage Orders',
        link: '/pages/orders/manage-orders',
      }
    ],
  },
  {
    title: ' Users',
    icon: 'fa fa-users',
    children: [
      {
        title: 'Manage Users',
        link: '/pages/users/manage-users',
      },
    ],
  },
  {
    title:"PINs",
    icon:"fa fa-map-marker",
    children:[
      {
        title:"Manage PINs",
        link:"/pages/pins/manage-pins"
      }
    ]
  },
  {
    title:"Who we are",
    icon:"nb-person",
    children:[
      {
        title:"About Us",
        link:"/pages/who-we-are/about-us"
      },
      {
        title:"What we do",
        link:"/pages/who-we-are/what-we-do"
      }
    ]
  },
  {
    title:"FAQ",
    icon:"fa fa-question",
    children:[
      {
        title:"Add FAQ",
        link:"/pages/faq/add-faq"
      }
    ]
  },
  {
    title:"Advertise with us",
    icon:"fab fa-adversal",
    children:[
      {
        title:"Update Advertise with us",
        link:"/pages/ad/update"
      }
    ]
  },
  {
    title:"Become our distributor",
    icon:"fas fa-globe-asia",
    children:[
      {
        title:"Update become our distributor",
        link:"/pages/distributor/update"
      }
    ]
  },
  {
    title:"Publish with us",
    icon:"fas fa-atlas",
    children:[
      {
        title:"Update publish with us",
        link:"/pages/publish/update"
      }
    ]
  },
  {
    title:"Sell with us",
    icon:"fas fa-handshake",
    children:[
      {
        title:"Update sell with us",
        link:"/pages/sell/update"
      }
    ]
  },
  {
    title:"Report Infringment",
    icon:"fas fa-flag",
    children:[
      {
        title:"Update Report Infringment",
        link:"/pages/report/update"
      }
    ]
  },
  {
    title:"Terms & Conditions",
    icon:"fa fa-info",
    children:[
      {
        title:"Update Terms & Conditions",
        link:"/pages/terms/update-terms"
      }
    ]
  },
  {
    title:"Privacy Policy",
    icon:"fa fa-user-secret",
    children:[
      {
        title:"Update Privacy Policy",
        link:"/pages/privacy-policy/update-privacy-policy"
      }
    ]
  },
  {
    title:"Contact Us",
    icon:"nb-phone",
    children:[
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
