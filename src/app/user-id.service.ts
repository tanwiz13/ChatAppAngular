import { Injectable } from '@angular/core';
import { Router } from '../../node_modules/@angular/router'
@Injectable({
  providedIn: 'root'
})
export class UserIdService {

  constructor(private route:Router) { }
  
  canActivate(){
    if(localStorage.getItem("loggedIn1")=="userLoggedIn1"){
      alert("You are already logged in.");
      this.route.navigate(["/chatscreen"]);
      return false;
    }
    return true;
  }
}
