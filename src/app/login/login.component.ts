import { Component, OnInit } from '@angular/core';
import { RouterModule,Routes,Router } from '@angular/router';
import { ServerService } from '../server.service';
import {
  AuthService,
  GoogleLoginProvider
} from 'angular-6-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private socialAuthService: AuthService,private router : Router,private serve:ServerService) { }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          console.log(socialPlatform+" sign in data : " , userData);
          this.serve.setUserId(userData.id);
          this.router.navigate(['\chatscreen']);
          localStorage.setItem("id", userData.id);
          console.log(localStorage);
        }
      );
    }
  }


  ngOnInit() {
  }

}
