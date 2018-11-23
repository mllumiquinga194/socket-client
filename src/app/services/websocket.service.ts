import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor(
    private socket: Socket
  ) {

    //llamo aqui a esta funcion porque el constructor del servicio solo se ejecuta una vez y el connect y disconnect son observables, siempre van a estar pendiente con lo que suceda con el connect y disconnect
    this.ckeckStatus();
  }

  ckeckStatus() {

    this.socket.on('connect', () => {
      console.log('Conectado al Servidor');
      this.socketStatus = true;

    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado al Servidor');
      this.socketStatus = false;

    });
  }

  // EMITIR
  //este metodo se va a encargar de emitir todo
  // event: Lo que uiqero emitir
  // payload: la informacion que quiero enviar
  //callback: la funcion que yo quiero ejecutar despues que se realice este trabajo!
  emit( event: string, payload?: any, callback?: Function ){
    
    this.socket.emit( event, payload, callback );
  }

  //ESCUCHAR
  // Responsable de escuchar cualquier evento que emita el servidor
  // recibe un string desde el servidor y con fromEvent() retorno un observable. en este caso solo lo estams definiendo.
  // esto lo sigue escuchando en ChatService.getMessages
  listen( event: string ){
    return this.socket.fromEvent( event );
  }
}
