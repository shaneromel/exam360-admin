import {Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile' ;
import { UserService } from '../../services/user.service';
import { BookService } from '../../services/book.service';
import { OrderService } from '../../services/order.service';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  private alive = true;

  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Roller Shades',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Wireless Audio',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Coffee Maker',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
        type: 'danger',
      },
      {
        ...this.coffeeMakerCard,
        type: 'secondary',
      },
    ],
  };

  usersLength:number;
  booksLength:number;
  ordersLength:number;
  totalEarnings:number;
  unshippedOrdersLength:number;
  shippedOrdersLength:number;
  canceledOrdersLength:number;
  liveProducts:number;
  paperBackLength:number;
  pdfLength:number;
  todayOrdersLength:number;
  todayOrdersCost:number;
  weekOrdersLength:number;
  weekOrdersCost:number;
  fifteenDaysOrdersCost:number;
  fifteenDaysOrdersLength:number;
  thirtyDaysOrdersLength:number;
  thirtyDaysOrdersCost:number;
  totalSales:number;

  constructor(private themeService: NbThemeService, private userService:UserService, private bookService:BookService, private orderService:OrderService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });
  }

  ngOnInit(){

    this.orderService.getUnshippedOrders().subscribe(orders=>{
      this.unshippedOrdersLength=orders.length;
    });

    this.bookService.getBooks().subscribe(books=>{
      this.liveProducts=books.length;
      console.log(books);
    })

    this.orderService.getShippedOrders().subscribe(orders=>{
      this.shippedOrdersLength=orders.length;
      this.totalSales=0;
      orders.forEach(a=>{
        this.totalSales=this.totalSales+a.total;
      });
    });

    this.bookService.getPdfs().subscribe(books=>{
      this.pdfLength=books.length;
    });

    this.orderService.getOrdersTimestamp(Date.now()-24*60*60*1000).subscribe(orders=>{
      this.todayOrdersLength=orders.length;
      this.todayOrdersCost=0;
      orders.forEach(a=>{
        this.todayOrdersCost=this.todayOrdersCost+a.total;
      })
    });

    this.orderService.getOrdersTimestamp(Date.now()-7*24*60*60*1000).subscribe(orders=>{
      this.weekOrdersLength=orders.length;
      this.weekOrdersCost=0;
      orders.forEach(a=>{
        this.weekOrdersCost=this.weekOrdersCost+a.total;
      });
    });

    this.orderService.getOrdersTimestamp(Date.now()-15*24*60*60*1000).subscribe(orders=>{
      this.fifteenDaysOrdersCost=0;
      this.fifteenDaysOrdersLength=orders.length;
      orders.forEach(a=>{
        this.fifteenDaysOrdersCost=this.fifteenDaysOrdersCost+a.total;
      });
    });

    this.orderService.getOrdersTimestamp(Date.now()-30*24*60*60*1000).subscribe(orders=>{
      this.thirtyDaysOrdersLength=orders.length;
      this.thirtyDaysOrdersCost=0;
      orders.forEach(a=>{
        this.thirtyDaysOrdersCost=this.thirtyDaysOrdersCost+a.total;
      })
    })

    this.orderService.getCanceledOrders().subscribe(orders=>{
      this.canceledOrdersLength=orders.length;
    })

    this.userService.getUsers().subscribe(users=>{
      this.usersLength=users.length;
    });

    this.bookService.getBooks().subscribe(books=>{
      this.booksLength=books.length;
      this.paperBackLength=books.filter(a=>{
        return a.type!=2;
      }).length;
    });

    this.orderService.getShippedOrders().subscribe(order=>{
      this.ordersLength=order.length;
      this.totalEarnings=0;
      order.forEach(a=>{
        this.totalEarnings=this.totalEarnings+a.total;
      })
    });

  }

  ngOnDestroy() {
    this.alive = false;
  }
}
