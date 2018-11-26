import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario = null;

  constructor(
    private socket: Socket
  ) {

    //llamo aqui a esta funcion porque el constructor del servicio solo se ejecuta una vez y el connect y disconnect son observables, siempre van a estar pendiente con lo que suceda con el connect y disconnect
    //pregunto si hay algo en el localstorage.
    this.cargarStorage();
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

  loginWs( nombre: string ){

    // esta funcion se hace muy rapido pero no es asincrona, por eso vamos a retornar una promesa para poder indicar que ya termina de una manera exitosa o no

    return new Promise( (resolve, reject) => {

          //AQUI ESTOY EMITIENDO AL SERVIDOR EL NOMBRE DEL EVENTO, EL PAYLOAD Y LA FUNCION DE CALLBACK QUE SE EJECUTARA UNA VEZ ME RESPONDA EL RESVIDOR "ASI LO ENTIENDO YO". ESTE EMIT LO RECIBE const loginWs EN EL SERVIDOR EN EL ARCHIVO SOCKETS.TS
      
          //como ya tengo una funcion de emit(), no es necesario generar otro emit. aunque si se puede hacer
          this.emit( 'configurar-usuario', { nombre }, resp => {
            
            // el servidor me puede responder cualquier cosa, puede ser un error pero asumiremos que todo ira bien y aqui pondremos el resolve

            //mi usuario sera como el Modelo de Usuario
            this.usuario = new Usuario( nombre );
            // llamo a esta funcion que lo que hace es guardar en el localstorage
            this.guardarStorage();
            resolve();
           });
          // this.socket.emit( 'configurar-nombre', { nombre }, (resp) => {
          //   console.log(resp);
          // });
    });
  }

  getUsuario(){

    return this.usuario;
  }

  guardarStorage( ){

    localStorage.setItem('usuario', JSON.stringify( this.usuario ));
  }

  cargarStorage(){

    if( localStorage.getItem('usuario') ){
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      //cuando recargo la pagina y el localstorage me indica que el usuario si existe, puedo llamar a esta funcion como si me estuviera logeando nuevamente la cual manda el nombre al backend
      this.loginWs( this.usuario.nombre );
    }
  }

}
