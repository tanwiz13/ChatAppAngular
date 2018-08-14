import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { FormsModule } from '@angular/forms';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnInit {

  constructor(private serve:ServerService , private route:Router) {}
  interval;
  elementID="chathistory";
  cId:string;
  MemberName:string;
  ChannelName:string;
  allChannelsArray:any=[];
  searchResult:any=[];
  channel_id:string;
  TextMessage:string;
  allMessages=[];
  newMessage:string;
  ChannelSearch:string;
  username=localStorage.getItem("username");
 ngOnInit(){ 
  this.interval =setInterval(()=>{
    this.serve.getChat(this.channel_id).subscribe(res=>{
      console.log(res);
      this.allMessages=res.messages;
    },
    err =>{
      console.log(err);
    })
  },2000)
  // this.showChat();
  // this.allMessages=[];
    // this.serve.getChannels().subscribe((res) => {
    //   for(var i = 0 ; i < res.channels.length ; i++){
    //     if(res.channels[i].unique_name != null)
    //       {this.allChannelsArray.push(res.channels[i].unique_name);}
    //     }
    //   },
    //   (err)=>{
    //     console.log(err)
    //   }
    // );
    // console.log(this.allChannelsArray);
 }
  // setServer(){
  //   this.serve.setNewChannel().subscribe(res=>{
  //     console.log(res);
  //   },
  // err=>{
  //   console.log(err);
  // })
  // }


  setNewChannel(){
    this.serve.setNewChannel(this.ChannelName).subscribe(res=>{
      console.log(res);
    },
    err=>{
      console.log(err);
    })
    this.allChannelsArray.push(this.ChannelName);
    console.log(this.allChannelsArray);
  }

  searchChannel(){
    this.serve.searchChannel(this.ChannelSearch).subscribe(res=>{
      res.channels.map(key => {
        if (this.ChannelSearch===key.unique_name) {
          this.searchResult.push(key.unique_name);
          this.channel_id=key.sid;
        }
      });
    });
    this.searchResult=[];
    console.log(this.searchResult);
  }

  joinChannel(){
    console.log(this.channel_id);
    this.showChat();
    this.serve.addMember(this.channel_id).subscribe(res=>{
      console.log(res);
    },
    err=>{
      console.log(err);
    });
  }

  logout(){
    localStorage.clear();
    this.route.navigate(["/"]);

  }

  // delete(){
  //   this.serve.deleteChannel().subscribe(res=>{
  //     console.log(res);
  //   },
  // err=>{
  //   console.log(err);
  // });
  // }

  // addMember(){
  //   this.serve.addMember(this.cId,this.MemberName).subscribe(res=>{
  //     console.log(res);
  //   },
  //   err=>{
  //     console.log(err);
  //   });
  // }
  showChat(){
    this.allMessages=[];
    this.serve.getChat(this.channel_id).subscribe(res=>{
      res.messages.map(key => {
        this.allMessages.push(key);
        console.log(this.allMessages);
    })},
    err =>{
      console.log(err);
    });
    
  }

   clearBox(){
    document.getElementById(this.elementID).innerHTML = "";
  }

  sendMessage(){
    this.serve.sendMessage(this.channel_id,this.TextMessage).subscribe(res=>{
      console.log(res);
    },
    err=>{
      console.log(err);
    });
  }
}
