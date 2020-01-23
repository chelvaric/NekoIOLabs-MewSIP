import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { SipConfig,SipService } from '@ubie/sip';
import { AlertController } from '@ionic/angular';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {


  ngAfterViewInit(): void {




  }


  @ViewChild('remoteVideo', { static: false }) remote: any;


  async MakeAllert(message:string) 
  {
    const alert = await   this.alertcontr.create({
      buttons:[
        {
          text: 'Deny',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.sip.refuseCall()
          }},
          {
            text: 'Accept',
           
            handler: () => {
              console.log('Cancel clicked');
              this.sip.acceptCall()
            }
          }
        
      ],
      message:message
    });

    await alert.present();
    
  }


  constructor(public sip:SipService, private alertcontr:AlertController) {

    sip.OnRegistered.subscribe((result:boolean) => {
         console.log("REGISTERED:" + result);
    });

    sip.OnIncommingCall.subscribe((result:string) => {
      console.log("Incomming call: " + result);
      this.MakeAllert(result + " ... is calling");
     });

 sip.OnMediaRecieved.subscribe((result:MediaStream) => {
 
     this.remote.nativeElement["srcObject"]  = result;
      this.remote.nativeElement.play();

    });

    var options: SipConfig = {

      Uri: '104@sip.qbus.be',
      UserName: '104',
      DisplayName:'wouter',
      WebsocketUrl:
     'wss://sip.qbus.be:8089/ws'
      ,
      Password: 'AABBCCDDEEFF'

    };

    sip.setConfig(options);

  }

 


}
