import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'ngx-order-id',
  templateUrl: './order-id.component.html',
  styleUrls: ['./order-id.component.scss']
})
export class OrderIdComponent implements OnInit {

  @Input() rowData:any;
  user:any;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getUserByUid(this.rowData.user_uid).subscribe(user=>{
      this.user=user;
    })
  }

}
