import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  //De esta forma puedo manejar un observable
  usuariosActivosObs: Observable<any>;

  constructor(
    public _chatService: ChatService
  ) { }

  ngOnInit() {

    //para manejar un pipe de angular que maneja los observables. se ve en el html
    this.usuariosActivosObs = this._chatService.getUsuariosActivos();

    //emite un llamado para recibir los usuarios conectados
    //lo recibo en el servicio this._chatService.getUsuariosActivos(); y lo retorno arriba :)
    this._chatService.emitirUsuariosActivos();
  }

}
