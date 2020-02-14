import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/Produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

/**
 * Generated class for the ProdutoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage  {

  produtos: ProdutoDTO[];

  selectedCategoriaID: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService: ProdutoService) {
    this.selectedCategoriaID = navParams.get('catParam');
  }

  ionViewDidLoad() {
    this.produtoService.findAll(this.selectedCategoriaID).subscribe(response =>{
      this.produtos = response;
    },erro =>{
      console.log(erro);
    });
  }



}
