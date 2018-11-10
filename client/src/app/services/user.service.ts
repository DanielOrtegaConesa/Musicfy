import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {map} from 'rxjs/operators';
import { observable } from "rxjs";
import { Global } from "./global";

@Injectable()
export class UserService{
    public url: string;
    
    constructor(private _http: Http){
        this.url = Global.url;
    };

    singup(user_to_login, gethash = null){
     let params = JSON.stringify(user_to_login);
     
     let headers = new Headers({"Content-Type":"application/json"});

     return this._http.post(this.url+"login", params, {headers: headers}).pipe(map(res => res.json()));
    }
}