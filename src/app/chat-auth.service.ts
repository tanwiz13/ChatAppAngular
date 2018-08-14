import { Injectable } from '@angular/core';
import { CanActivate,Router } from '../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChatAuthService implements CanActivate {

  constructor(private route:Router) { }

  canActivate(){
    if(localStorage.getItem("loggedIn2")=="userLoggedIn2"){
      return true;
    }
    alert("Please login first.");
    this.route.navigate(["/"]);
    return false;
  }
}
