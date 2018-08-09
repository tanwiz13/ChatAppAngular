import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnInit {

  constructor(private serve:ServerService) { }

  newChannelName:string;
  allChannelsArray:any=[];

 ngOnInit(){
    this.serve.getChannels().subscribe((res) => {
      for(var i = 0 ; i < res.channels.length ; i++){
        if(res.channels[i].unique_name != null)
          {this.allChannelsArray.push(res.channels[i].unique_name);}
        }
      },
      (err)=>{
        console.log(err)
      }
    );
    console.log(this.allChannelsArray);
 }
  // setServer(){
  //   this.serve.setNewChannel().subscribe(res=>{
  //     console.log(res);
  //   },
  // err=>{
  //   console.log(err);
  // })
  // }


  setNewChannel(name){
    this.newChannelName=name;
    this.serve.setNewChannel(this.newChannelName).subscribe(res=>{
      console.log(res);
    },
    err=>{
      console.log(err);
    })
    this.allChannelsArray.push(this.newChannelName);
    console.log(this.allChannelsArray);
  }

  addMember(){
    this.serve.addMember().subscribe(res=>{
      console.log(res);
    },
    err=>{
      console.log(err);
    });
  }

  showChat(){
    this.serve.getChat().subscribe(res=>{
      console.log(res);
    },
    err=>{
      console.log(err);
    });
  }

  sendMessage(str){
    this.serve.sendMessage(str).subscribe(res=>{
      console.log(res);
    },
    err=>{
      console.log(err);
    });
  }
}
