import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Usuario } from 'src/app/classes/usuarios.model';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  constructor(
    public _wsService: WebsocketService
  ) { }

  ngOnInit() {
  }

  salir(){
    this._wsService.logoutWS();
  }

}
