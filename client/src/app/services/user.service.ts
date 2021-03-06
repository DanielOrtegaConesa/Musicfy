import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {map} from 'rxjs/operators';
import { observable } from "rxjs";
import { Global } from "./global";
import { User } from '../models/user';

@Injectable()
export class UserService{
    public url: string;
    public identity = null;
    public token = null;
    
    constructor(private _http: Http){
        this.url = Global.url;
    };

    singup(user_to_login, gethash = null){
        if(gethash != null){
            user_to_login.gethash = gethash;
        }
        let params = JSON.stringify(user_to_login);
        
        let headers = new Headers({"Content-Type":"application/json"});

        return this._http.post(this.url+"login", params, {headers: headers}).pipe(map(res => res.json()));
    }

    getIdentity(){
        this.identity = JSON.parse(localStorage.getItem("identity"));
        return this.identity;
    }

    getToken(){
        this.token = JSON.parse(localStorage.getItem("token"));
        return this.token;
    }

    register(user_to_register:User){
        let params = JSON.stringify(user_to_register);
        
        let headers = new Headers({"Content-Type":"application/json"});

        return this._http.post(this.url+"register", params, {headers: headers}).pipe(map(res => res.json()));
    }

    updateUser(user_to_update:User){
        let params = JSON.stringify(user_to_update);        
        let headers = new Headers({
            "Content-Type":"application/json",
            "Authorization" : this.getToken()
        });
        return this._http.put(this.url+"update-user/"+user_to_update._id, params, {headers: headers}).pipe(map(res => res.json()));
    }
}