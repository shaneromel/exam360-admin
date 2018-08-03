import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import * as firebase from 'firebase';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  currentPass:string;
  newPass:string;

  constructor(private authService:AuthService, private toaster:ToastrService) { }

  ngOnInit() {
  }

  changePassword(){
    firebase.firestore().doc("admin/"+this.authService.afAuth.auth.currentUser.uid).get().then(querySnapshot=>{
      console.log(querySnapshot.data());
      if(this.currentPass===querySnapshot.data().password){
        this.authService.changePassword(this.newPass, this.authService.afAuth.auth.currentUser.uid).then(()=>{
          this.toaster.success("Password successfully changed!");
        }).catch(err=>{
          this.toaster.error(err.message);
        })
      }else{
        this.toaster.error("Invalid current password.");
      }
    })
  }

}
