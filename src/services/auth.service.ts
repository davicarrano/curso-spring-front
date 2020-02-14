import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/Credenciais.dto";
import { StorageService } from "./storage.service";
import { LocalUser } from "../models/local-user";

@Injectable()
export class AuthService{
    constructor(public http:HttpClient, public storageService: StorageService){
        
    }

    autenticar(creds: CredenciaisDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/login`,creds,
        {
            observe:'response',
            responseType:'text'
        });
    }

    successfulLogin(email:string, token: string){
        let tok = token.substring(7);
        let user : LocalUser = {
            token: tok,
            email: email
        }
        this.storageService.setLocalUser(user);
    }

    logout(){
        this.storageService.setLocalUser(null);
    }
}