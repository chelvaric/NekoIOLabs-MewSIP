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

      uri: '104@sip.qbus.be',
      authorizationUser: '104',
      displayName:'wouter',
      transportOptions: {
        wsServers: ['wss://sip.qbus.be:8089/ws']
      },
      password: 'AABBCCDDEEFF'

    };

    this.userAgent = new UA(options)
    this.userAgent.on('invite', (session:InviteServerContext) => this.recievingCall(session));
    this.userAgent.on('registered',(response?:any) => { console.log('registered'); console.log(response); this.userAgent.invite('10'); } );
    this.userAgent.on('registrationFailed',(response?: any, cause?: any) => console.log('failed to register: ' + cause));
    this.userAgent.on('inviteSent',(session:InviteClientContext) => { console.log('RECIEVED CALL'); console.log(session); })

  }

  calling(context: InviteClientContext)
  {
     this.callSession = context;
     context.on('failed',(reponse?:any,cause?:any) =>{ console.log("failed"); console.log(cause); });
     context.on("accepted",(response: any,cause:any) => { console.log(cause);  console.log(response); })
     context.on('trackAdded', this.AttachIncommingMedia);
  }


  recievingCall(context: InviteServerContext) {
    console.log("incomming call");
    this.remoteCallSession = context;
    context.accept();
    context.on('trackAdded', this.AttachIncommingMedia);
  }

   AttachOutgoingMedia()
   {
      //get the peer Connection
    var pc = this.callSession.sessionDescriptionHandler["peerConnection"];
    //make the media stream
    var remoteStream = new MediaStream();
    //get audio and video track from remote
    pc.getReceivers().forEach(function (receiver) {
      remoteStream.addTrack(receiver.track);
    });

    //add the stream to the video element
    this.remote.nativeElement["srcObject"] = remoteStream;
    this.remote.nativeElement.play();

    console.log(this.remote.nativeElement);
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

    console.log(this.remote.nativeElement);
  }

 

 

  hangUp() {
    if(this.remoteCallSession !== undefined)
    {
      this.callSession.terminate();
      this.callSession = undefined;
    }
  
  }


}
