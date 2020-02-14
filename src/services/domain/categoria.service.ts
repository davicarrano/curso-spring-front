import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/Categoria.dto";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";
import { LocalUser } from "../../models/local-user";
import { Header } from "ionic-angular";

@Injectable()
export class CategoriaService{
    constructor(public http:HttpClient, public storageService: StorageService){
        
    }

    findAll(): Observable<CategoriaDTO[]>{
        let user: LocalUser = this.storageService.getLocalUser();
        let headersCustom = new HttpHeaders();
        headersCustom.append('Authorization','Bearer '+user.token);

        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias/todas`,
            { headers: headersCustom});
    }


}