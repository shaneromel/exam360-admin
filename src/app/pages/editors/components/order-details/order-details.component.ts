import { Component, OnInit, Input } from '@angular/core';
import { BookService } from '../../../../services/book.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'ngx-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  @Input() order:any;
  books:any;
  user:any;

  constructor(private bookService:BookService, private userService:UserService) { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.order){
      this.order.cart=this.order.cart.map(a=>{
        switch(a.type){
          case 1:
          a.typeName="Hard copy and Soft copy";
          break;
          case 2:
          a.typeName="Soft copy only";
          break;
          default:
          a.typeName="Hard copy only";
        }

        return a;
      })
      console.log(this.order);
      this.userService.getUserByUid(this.order.user_uid).subscribe(user=>{
        this.user=user;
        console.log(user);
      })
    }
  }

}
