import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
//el CanActivate es el que le va a decir a nuestro router, a la ruta que tenga implementada este Guard, que hay condiciones que debe cumplir si lo quieres dejar pasar.
export class UsuarioGuard implements CanActivate {

  constructor(
    public _wsService: WebsocketService,
    private _router: Router
  ) { }

  //esto es lo que me ayudara a verificar si cumple las condiciones para dejarlo pasar al url solicitado, asi lo enrtiendo yo!!
  // en el app-routeng se llama a este UsuarioGuard en la ruta donde quiero aplicar este Guard
  canActivate() {

    //si existe, devuelve true,
    if (this._wsService.getUsuario()) {
      return true;
    } else {
      //si no existe, devuelve false!!
      this._router.navigateByUrl('/');
      return false;
    }
  }
}
