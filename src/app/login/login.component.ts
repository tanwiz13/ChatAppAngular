import { Component, OnInit } from '@angular/core';
import { RouterModule,Routes,Router } from '@angular/router';
import { ServerService } from '../server.service';
import { UserIdService } from '../user-id.service'
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

  constructor(private socialAuthService: AuthService, private router : Router, private serve:ServerService, private userid:UserIdService) { }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          console.log(socialPlatform+" sign in data : " , userData);
          localStorage.setItem("userData",JSON.stringify(userData));
          localStorage.setItem("loggedIn1","userLoggedIn1");
          localStorage.setItem("loggedIn2","userLoggedIn2");
          localStorage.setItem("username",userData.email);
          this.router.navigate(['/chatscreen']);
        }
      );
    }
  }


  ngOnInit() {
  }

}
