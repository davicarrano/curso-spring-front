import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { LocalUser } from '../../models/local-user';
import { API_CONFIG } from '../../config/api.config';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public storage: StorageService,
              public clienteService: ClienteService) {
              

  }

  ionViewDidLoad() {
    let localUser : LocalUser = this.storage.getLocalUser();
    if (localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response=>{
        this.cliente = response;
        this.getImageExists();
      }, erro=>{
        if(erro.status == 403){
          this.navCtrl.setRoot('HomePage');
        }
        console.error(erro);
      })

    }else{
      //console.error("Valor do LocalUser: ",localUser);
      this.navCtrl.setRoot('HomePage');

    }
  }

  getImageExists(){
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response=>{
          this.cliente.imageUrl = `${API_CONFIG.bucketUrl}/profile${this.cliente.id}.jpg`;
      },erro=>{
        console.error(erro);
      })
  }

}
