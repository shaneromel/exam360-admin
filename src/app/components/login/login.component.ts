import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  loadingState:boolean;

  constructor(private authService:AuthService, private toaster:ToastrService, private router:Router) {
    this.loadingState=false;
   }

  ngOnInit() {
  }

  login(){
    this.loadingState=true;
    this.authService.getToken(this.email,this.password).subscribe(response=>{
      if(response.code==="success"){
        this.authService.afAuth.auth.signInWithCustomToken(response.token).then(()=>{
          this.router.navigate(['/pages']);
        }).catch(err=>{
          this.toaster.error(err.message);
        })
      }else{
        this.toaster.error(response.error);
      }
      this.loadingState=false;
    })
  }
 
}