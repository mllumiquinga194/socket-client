import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  public texto = '';
  public mensajesSubscription: Subscription;
  elemento: HTMLElement;//esto lo voy a usar para que al enviar un msj que me llene la cajita, se haga scroll automaticamente

  public mensajes: any[] = [];
  constructor(
    public _chatService: ChatService
  ) { }

  ngOnInit() {

    this.elemento = document.getElementById('chat-mensajes');//guardo la referencia de la caja que voy a hacer el scroll
    //cuando salga del chat component necesito destruir esta subscripcion

    // estoy escuchando cualquier emision del servidor llamada 'nuevo-mensaje'
    this.mensajesSubscription = this._chatService.getMessages().subscribe( msg => {

      this.mensajes.push( msg );

      //con esta funcion muevo mi scroll de esta manera
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
      
    });
  }

  ngOnDestroy() {

    this.mensajesSubscription.unsubscribe();
  }

  enviar(){

    //esto para evitar que se envie un msj vacio
    if( this.texto.trim().length === 0 ){
      return;
    }

    this._chatService.sendMessage( this.texto );
    this.texto = '';
  }

}
