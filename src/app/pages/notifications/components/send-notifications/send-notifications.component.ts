import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-send-notifications',
  templateUrl: './send-notifications.component.html',
  styleUrls: ['./send-notifications.component.scss']
})
export class SendNotificationsComponent implements OnInit {

  title:string;
  body:string;

  constructor(private http:HttpClient, private toaster:ToastrService) { }

  ngOnInit() {
  }

  sendNotification(){

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                               .set('authorization',"key=AAAACkszhu0:APA91bFed3TkVNE1A55VXrZMQq4gyA5Vn7C53b4kHZjQPICHbA0YsXZyA-0fZ0jjpd9Dj1whT05ooECbIT3aSTrgpzA6CKuvuIVlWGUvucKWXsiN3jUkHkBmHI5TerRBmrSVDp0yOX82yhcFthGgV8Bfgqz_L08Qlg");

    var data={
      "to": "/topics/all",
        "notification": {
          "title": this.title,
          "body": this.body,
          "icon":"https://firebasestorage.googleapis.com/v0/b/exam360-2d6ff.appspot.com/o/icon-192x192.png?alt=media&token=4435d789-f769-42e1-8ab4-efb3ef5b1615"
        },
      "project_id":"exam360-2d6ff"
    }

    this.http.post<any>("https://fcm.googleapis.com/fcm/send",data,{headers:headers}).subscribe(response=>{
      if(response.message_id){
        this.toaster.success("Notification successfully sent!","Success")
      }else{
        this.toaster.error("There was some error sending the notification.","Error")
      }
    })
  }

}
