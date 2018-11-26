import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public nombre = '';

  constructor(
    public _wsService: WebsocketService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  ingresar(){

    this._wsService.loginWs( this.nombre )
      .then( () => {
        this._router.navigateByUrl('/mensajes');
      });
  }

}
