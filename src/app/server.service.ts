import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { setRootDomAdapter } from '../../node_modules/@angular/platform-browser/src/dom/dom_adapter'
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../node_modules/rxjs'
import { map } from 'rxjs/operators';
import { CanActivate } from '../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  // url:string="https://chat.twilio.com/v2/Services";
  // channel:string="https://chat.twilio.com/v2/Services/IS42952ba64edc4d82ae71d3e8a91a9321/Channels"
  httpheaders = {
    headers : new HttpHeaders({
      'content-type':'application/x-www-form-urlencoded',
      'Authorization': 'Basic QUNiNDJmMzk3ZTMxOWQ5ZGJkMWNlNWRkOTFhMjc3ZDEzZDo0OTQzMTk1ZmQ5YTQxZDRmN2RjYTI2Y2Y5NDZiMjU2OA=='
    })
  }
 

  constructor(private http:HttpClient) { }
  // data='Hello'
  sId:string="IS2de21c6f55764d4c956e4168156aaaea ";
  // cId:string="CH548fa9c3306b4dabbe5b8f1d0d479f9a";
  allChannelsArray:any=[];
  username=localStorage.getItem("username");

  // setServer(): Observable<any>{
  //   return this.http.post<any>('https://chat.twilio.com/v2/Services','FriendlyName=ChatService',this.httpheaders);
  // }

  getChannelId():Observable<any>{
    return this.http.get<any>("https://chat.twilio.com/v2/Services/"+this.sId+"/Channels",this.httpheaders);
  }

  setNewChannel(newChannelName :any): Observable<any>{
    return this.http.post<any>("https://chat.twilio.com/v2/Services/"+this.sId+"/Channels",'UniqueName='+newChannelName,this.httpheaders);
  }
  
  searchChannel(ChannelName:any):Observable<any>{
    return  this.http.get("https://chat.twilio.com/v2/Services/"+this.sId+"/Channels",this.httpheaders); 
  }

  getChannels(): Observable<any>{
    return this.http.get<any>("https://chat.twilio.com/v2/Services/"+this.sId+"/Channels",this.httpheaders).pipe(map(data=>data));
  }
  
  addMember(cId:any):Observable<any>{
    return this.http.post<any>("https://chat.twilio.com/v2/Services/"+this.sId+"/Channels/"+cId+"/Members","Identity="+this.username,this.httpheaders);
  }

  getChat(cId:any):Observable<any>{
    return this.http.get<any>("https://chat.twilio.com/v2/Services/"+this.sId+"/Channels/"+cId+"/Messages",this.httpheaders).pipe(map(data=>data));
  }

  sendMessage(cId:any,message:any):Observable<any>{
    return this.http.post<any>("https://chat.twilio.com/v2/Services/"+this.sId+"/Channels/"+cId+"/Messages","ChannelSid="+cId+"&ServicesSid="+this.sId+"&Body="+message+"&From="+this.username,this.httpheaders);
  }

  // deleteChannel():Observable<any>{
  //   return this.http.delete<any>("https://chat.twilio.com/v2/Services/"+this.sId+"/Channels/CH508779e14eec431797da3d13e4f9d78c");
  // }
}
