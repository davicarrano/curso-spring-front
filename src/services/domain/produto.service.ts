import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ProdutoDTO } from "../../models/Produto.dto";

@Injectable()
export class ProdutoService{
    constructor(public http:HttpClient){
        
    }

    findAll(idCat: string): Observable<ProdutoDTO[]>{
        return this.http.get<ProdutoDTO[]>(`${API_CONFIG.baseUrl}/produtos/porCat/${idCat}`);
    }

}