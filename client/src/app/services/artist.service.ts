import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {map} from 'rxjs/operators';
import { observable } from "rxjs";
import { Global } from "./global";
import { Artist } from '../models/artist';

@Injectable()
export class ArtistService{
    public url: string;
    
    constructor(private _http: Http){
        this.url = Global.url;
    };

    addArtist(token, artist: Artist){
        let params = JSON.stringify(artist);
        let headers = new Headers({
            "Content-Type" : "application/json",
            "Authorizarion" : token
        });

        return this._http.post(this.url + "artist", params, { headers: headers }).pipe(map(res => res.json()));
    }
}