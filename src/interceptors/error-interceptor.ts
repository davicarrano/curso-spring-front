import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor(public storageService: StorageService,
                public alertController: AlertController){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req)
            .catch((error,caught) => {
                let errorObj = error;
                if(errorObj.error){
                    errorObj = errorObj.error;
                }

                if (!errorObj.status){
                    errorObj= JSON.parse(errorObj);
                }
                

                switch(errorObj.status){
                    case 401:
                        this.handle401();
                        break;
                    case 403:
                        this.handle403();
                        break;
                }
                return Observable.throw(errorObj);
            }) as any;
    }
    
    handle401(){
        let alert = this.alertController.create({
            title: 'Erro 401: falha de autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss:false,
            buttons:[
                {
                    text: 'OK'
                }

            ]
        });
        alert.present();

    }

    handle403(){
        this.storageService.setLocalUser(null);
    }
}

export const ErrorInterceptorProvider={
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}