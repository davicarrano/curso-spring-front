import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/Credenciais.dto';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email : '',
    senha : ''
  };

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService,
    public storage: StorageService) {

  }

  login(){
    this.auth.autenticar(this.creds).subscribe(response=>{
      this.auth.successfulLogin(response.headers.get('Authorization'));     
    }, erro=>{
      console.log(erro);
    });
    this.navCtrl.setRoot('CategoriasPage');
  }

  ionViewWillEnter (){
    this.menu.swipeEnable(false);

  }

  ionViewWillLeave (){
    this.menu.swipeEnable(true);
  }

}
