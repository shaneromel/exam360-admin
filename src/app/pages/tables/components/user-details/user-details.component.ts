import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Input() user:any;

  constructor() { }

  ngOnInit() {
  }

}
