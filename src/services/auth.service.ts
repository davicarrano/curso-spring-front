import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/Credenciais.dto";
import { StorageService } from "./storage.service";
import { LocalUser } from "../models/local-user";
import {JwtHelper} from "angular2-jwt";

@Injectable()
export class AuthService{
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(public http:HttpClient, public storageService: StorageService){
        
    }

    autenticar(creds: CredenciaisDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/login`,creds,
        {
            observe:'response',
            responseType:'text'
        });
    }

    refreshToken(){
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`,{},
        {
            observe:'response',
            responseType:'text'
        });
    }

    successfulLogin( token: string){
        let tok = token.substring(7);
        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        }
        this.storageService.setLocalUser(user);
    }

    logout(){
        this.storageService.setLocalUser(null);
    }
}