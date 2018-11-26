import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { UsuarioGuard } from './guards/usuario-guard.service';

//RUTAS BASICAS INICIALES
const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  // en el UsuarioGuard.service tendo definido lo que me permitira o no, acceder a esta ruta!
  { path: 'mensajes', 
    component: MensajesComponent,
    canActivate: [ UsuarioGuard ] },
  { path: '**', component: LoginComponent }
];


@NgModule({
//AHORA LAS DEFINO PARA QUE SEAN PARTE DE MI RouterModule
  imports: [
    RouterModule.forRoot( appRoutes )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
