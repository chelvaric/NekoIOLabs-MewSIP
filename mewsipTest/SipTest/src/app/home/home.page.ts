import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Simple } from 'sip.js/lib/Web';
import { InviteServerContext, InviteClientContext } from 'sip.js/lib/Session';
import { UA } from 'sip.js/lib/UA';
import { SessionDescriptionHandler } from 'sip.js/lib/session-description-handler';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {


  ngAfterViewInit(): void {




  }


  @ViewChild('remoteVideo', { static: false }) remote: any;


  userAgent: UA;

  callSession: InviteClientContext;
  remoteCallSession: InviteServerContext;

  constructor() {

    var options: UA.Options = {

      uri: 'chelvaric@sip.antisip.com',
      authorizationUser: 'chelvaric',
      transportOptions: {
        wsServers: ['wss://sip.antisip.com:9091']
      },
      password: 'sospiet2W'

    };

    this.userAgent = new UA(options)
    this.userAgent.on('invite', this.recievingCall);
    this.userAgent.on('registered',() => console.log('registered'));
    this.userAgent.on('registrationFailed',() => console.log('failed to register'));

  }




  recievingCall(context: InviteServerContext) {
    console.log("incomming call");
    this.remoteCallSession = context;
    context.accept();
    context.on('trackAdded', this.AttachIncommingMedia);
  }

  //attach the video for an incomming call
  AttachIncommingMedia() {
    //get the peer Connection
    var pc = this.remoteCallSession.sessionDescriptionHandler["peerConnection"];
    //make the media stream
    var remoteStream = new MediaStream();
    //get audio and video track from remote
    pc.getReceivers().forEach(function (receiver) {
      remoteStream.addTrack(receiver.track);
    });

    //add the stream to the video element
    this.remote.nativeElement["srcObject"] = remoteStream;
    this.remote.nativeElement.play();
  }

 

 

  hangUp() {
    if(this.remoteCallSession !== undefined)
    {
      this.callSession.terminate();
      this.callSession = undefined;
    }
  
  }


}
