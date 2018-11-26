import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public _wsService: WebsocketService
  ) { }

  sendMessage( mensaje: string){
    
    const payload = {
      de: this._wsService.getUsuario().nombre,
      cuerpo: mensaje
    };

    //"mensaje" es el evento que voy a emitir. es simplemente el nombre del evento
    this._wsService.emit('mensaje', payload);
  }

  getMessages(){

    // aqui estoy retornando el mismo observable que recibi en WebsocketService.listen. en este caso si sé cual es el evento que necesito escuchar pero todavia no lo estoy usando. lo usare en el chat
    return this._wsService.listen('mensaje-nuevo');
  }

  getMessagesPrivate(){

    //esto regresa un observable que esta escuchando cualquier emision de 'mensaje-privado'
    return this._wsService.listen( 'mensaje-privado' );
  }
}
