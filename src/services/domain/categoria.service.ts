import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/Categoria.dto";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";

@Injectable()
export class CategoriaService{
    constructor(public http:HttpClient, public storageService: StorageService){
        
    }

    findAll(): Observable<CategoriaDTO[]>{      
        
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias/todas`);
           
    }


}