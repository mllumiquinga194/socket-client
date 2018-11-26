import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//  COMO NECESITO ESCUCHAR SIEMPRE CUANDO SE ENVIE UN MENSAJE PRIVADO Y EL APP.COMPONENT SIEMPRE ESTA CORRIENDO, ENTONCES ESTE ES EL LUGAR IDEAL PARA ESCUCHAR. SIN IMPORTAR EN QUE PARTE DE MI APLICACION ME ENCUENTRE. SIRVE EN CUALQUIER LUGAR DONDE SEPAMOS QUE SEMPRE VA A ESTAR CORRIENDO ESE CODIGO

export class AppComponent implements OnInit {
  
  constructor(
    public _wsService: WebsocketService,
    public _chatService: ChatService

  ){ }

  ngOnInit(){

    //aqui ya estoy escuchando cualquier emision de 'mensaje-privado'.
    this._chatService.getMessagesPrivate().subscribe( msg => {
      console.log( msg );
    } );
  }
}
