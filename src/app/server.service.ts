import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { setRootDomAdapter } from '../../node_modules/@angular/platform-browser/src/dom/dom_adapter'
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../node_modules/rxjs'
import { map } from 'rxjs/operators';
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
  sId:string="IScc535e84b05c40f6a1c17eaca9fb811f";
  cId:string="CH548fa9c3306b4dabbe5b8f1d0d479f9a";
  userId:string;
  allChannelsArray:any=[];

  setUserId(id:any){
    this.userId=id;
  }
  // setServer(): Observable<any>{
  //   return this.http.post<any>('https://chat.twilio.com/v2/Services','FriendlyName=ChatService',this.httpheaders);
  // }
  setNewChannel(newChannelName :any): Observable<any>{
    return this.http.post<any>("https://chat.twilio.com/v2/Services/"+this.sId+"/Channels",'UniqueName='+newChannelName,this.httpheaders);
  }
  
  // searchChannel():Observable<any>{
  //   return  this.http.get("https://chat.twilio.com/v2/Services/"+this.sId+"/Channels",this.httpheaders).pipe(map(data=>data)); 
  // }

  getChannels(): Observable<any>{
    return this.http.get<any>("https://chat.twilio.com/v2/Services/"+this.sId+"/Channels",this.httpheaders).pipe(map(data=>data));
  }
  
  addMember():Observable<any>{
    return this.http.post<any>("https://chat.twilio.com/v2/Services/"+this.sId+"/Channels/"+this.cId+"/Members","Identity="+this.userId,this.httpheaders);
  }

  getChat():Observable<any>{
    return this.http.get<any>("https://chat.twilio.com/v2/Services/"+this.sId+"/Channels/"+this.cId+"/Messages",this.httpheaders).pipe(map(data=>data));
  }

  sendMessage(str):Observable<any>{
    return this.http.post<any>("https://chat.twilio.com/v2/Services/"+this.sId+"/Channels/"+this.cId+"/Messages","ChannelSid="+this.cId+"&ServicesSid="+this.sId+"&Body="+str+"&From="+this.userId,this.httpheaders);
  }
}
