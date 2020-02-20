import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LocalUser } from "../models/local-user";
import { StorageService } from "../services/storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(public storageService: StorageService){

    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        let user: LocalUser = this.storageService.getLocalUser();

        if (user){
            const authReq = req.clone({headers: req.headers.set('Authorization','Bearer '+user.token)});
            return next.handle(authReq);
        }else{
            return next.handle(req);
        }

        
    }
    

}

export const AuthInterceptorProvider={
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}