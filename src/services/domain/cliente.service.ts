import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { StorageService } from "../storage.service";
import { Observable } from "rxjs";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class ClienteService{

    constructor(public http:HttpClient, public storageService: StorageService){

    }

    findByEmail(email: string): Observable<ClienteDTO> {
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/porEmail?valor=${email}`);
    }

    getImageFromBucket(id:string):Observable<any>{
        let url = `${API_CONFIG.bucketUrl}/profile${id}.jpg`;
        //let he : HttpHeaders = new HttpHeaders();
        //return this.http.get(url,);
        //https://www.html5rocks.com/en/tutorials/cors/
        //return this.http.get(url,{headers: he.set('Access-Control-Allow-Origin','http://localhost:8100'), responseType: 'blob'});
        //return this.http.get(url,{headers: he.set('Access-Control-Allow-Origin','http://localhost:8100'),responseType:"blob"});
        /*
        this.http.get(url,{responseType:"blob"}).subscribe(response=>{
            console.log(response);
        },erro=>{
            console.error(erro);
        })
        */
       
        return this.http.get(url,{responseType:"blob"});
        
        
    }

    insert(obj : ClienteDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}