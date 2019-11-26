import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Simple, } from 'sip.js/lib/Web';
import { InviteServerContext } from 'sip.js/lib/Session';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  
  
  ngAfterViewInit(): void {

    console.log(this.remote);

    var options = {
      media: {
        local: {
          video: this.local
        },
        remote: {
          video: this.remote,
          // This is necessary to do an audio/video call as opposed to just a video call
          audio: this.remote
        }
      },
      ua:{
        uri: 'sip:chelvaric@sip.antisip.com',
        authorizationUser: 'chelvaric',
         transportOptions: {
         wsServers: ['wss://sip.antisip.com']
       },
        password: 'sospiet2W'
      }
    };

    this.client = new Simple(options);
 
    console.log(this.client);

    this.client.on("ringing",this.recievingCall);
    this.client.on("connected",()=>{ console.log("conected"); });
  }


  @ViewChild('remoteVideo',{static: false}) remote: any;
  @ViewChild('localVideo',{static: false}) local: any;


  client: Simple;

  constructor() {

     

  }




  recievingCall()
  {
     this.client.answer(); 
  }

  call()
  {
    this.client.call("sip:chelvaric2@sip.antisip.com")
  }

  hangUp()
  {
    this.client.hangup();
  }
  

}
